#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
QuickAPIs Daily Check Script
 Checks GitHub Issues for new tool submissions and sends email report
"""

import os
import sys
import json
import re
import smtplib
import urllib.parse
import urllib.request
import urllib.error
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formatdate
from datetime import datetime

# Configuration
GITHUB_REPO = "yk8899git/quickapis-site"
LABEL = "工具提交"
TOOLS_JSON_URL = f"https://raw.githubusercontent.com/{GITHUB_REPO}/main/tools.json"
ISSUES_API_URL = f"https://api.github.com/repos/{GITHUB_REPO}/issues"

# Email config from environment (QQ SMTP)
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.qq.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "459104898@qq.com")
SMTP_PASS = os.environ.get("SMTP_PASS", "")
TO_EMAIL = os.environ.get("TO_EMAIL", "zb6578bb@outlook.com")

# Security check patterns
SHORT_LINK_DOMAINS = ["bit.ly", "t.cn", "goo.gl", "tinyurl.com", "ow.ly", "is.gd", "buff.ly"]
SENSITIVE_WORDS = ["政治", "色情", "赌博", "暴力", "毒品", "枪支", "代开发票", "代办证件"]
SQL_INJECTION_PATTERNS = [r"--", r";\s*drop", r";\s*delete", r";\s*insert", r";\s*update", r"union\s+select"]
XSS_PATTERNS = [r"<script", r"javascript:", r"onerror\s*=", r"onload\s*="]

def fetch_json(url):
    """Fetch JSON from URL"""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "QuickAPIs-CheckBot/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        return None

def fetch_issues():
    """Fetch open issues with label"""
    try:
        url = f"{ISSUES_API_URL}?state=open&labels={urllib.parse.quote(LABEL)}"
        req = urllib.request.Request(url, headers={"User-Agent": "QuickAPIs-CheckBot/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"Error fetching issues: {e}")
        return []

def check_url_safety(url):
    """Check if URL is safe"""
    issues = []
    if not url:
        issues.append("URL为空")
        return issues

    if not url.startswith("https://"):
        issues.append(f"非HTTPS协议: {url[:50]}")

    domain_match = re.search(r"https?://([^/]+)", url)
    if domain_match:
        domain = domain_match.group(1).lower()
        for short in SHORT_LINK_DOMAINS:
            if short in domain:
                issues.append(f"短链接域名: {domain}")
                break

    return issues

def check_content_safety(text):
    """Check content for sensitive words and malicious patterns"""
    issues = []
    if not text:
        return issues

    for word in SENSITIVE_WORDS:
        if word in text:
            issues.append(f"包含敏感词: {word}")

    for pattern in SQL_INJECTION_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            issues.append(f"疑似SQL注入特征")
            break

    for pattern in XSS_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            issues.append(f"疑似XSS攻击特征")
            break

    return issues

def audit_issue(issue):
    """Audit a single issue for security"""
    result = {
        "number": issue.get("number"),
        "title": issue.get("title", ""),
        "user": issue.get("user", {}).get("login", "unknown"),
        "url": issue.get("html_url", ""),
        "body": issue.get("body", ""),
        "status": "safe",
        "issues": []
    }

    body = issue.get("body", "") or ""

    urls = re.findall(r"https?://[^\s\)\]\>]+", body)
    for url in urls[:5]:
        url_issues = check_url_safety(url)
        result["issues"].extend(url_issues)

    content_issues = check_content_safety(body)
    result["issues"].extend(content_issues)

    if not body.strip():
        result["issues"].append("内容为空")

    if len(result["issues"]) > 0:
        result["status"] = "suspicious" if len(result["issues"]) < 3 else "dangerous"

    return result

def send_email(subject, body):
    """Send email via SMTP (QQ Mail)"""
    if not SMTP_USER or not SMTP_PASS:
        print("Email credentials not configured, skipping email")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["From"] = SMTP_USER
        msg["To"] = TO_EMAIL
        msg["Subject"] = subject
        msg["Date"] = formatdate(localtime=True)

        msg.attach(MIMEText(body, "plain", "utf-8"))

        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.set_debuglevel(0)
        server.ehlo("smtp.qq.com")
        server.starttls()
        server.ehlo("smtp.qq.com")
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(SMTP_USER, [TO_EMAIL], msg.as_string())
        server.quit()

        print(f"Email sent to {TO_EMAIL}")
        return True
    except smtplib.SMTPAuthenticationError as e:
        print(f"Authentication failed: {e}")
        return False
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False

def main():
    print(f"=== QuickAPIs Daily Check ===")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()

    # Fetch issues
    issues = fetch_issues()
    print(f"Found {len(issues)} issues with label '{LABEL}'")

    # Audit issues
    audit_results = []
    for issue in issues:
        result = audit_issue(issue)
        audit_results.append(result)
        print(f"  #{result['number']}: {result['status']} - {result['title'][:30]}")

    # Count tools
    tools_data = fetch_json(TOOLS_JSON_URL)
    tools_count = len(tools_data.get("tools", [])) if tools_data else "N/A"
    print(f"\nTotal tools: {tools_count}")

    # Build report
    report_lines = []
    report_lines.append("=== QuickAPIs Daily Check Report ===")
    report_lines.append(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} (Asia/Shanghai)")
    report_lines.append("")

    if not issues:
        report_lines.append("No new tool submissions today.")
        report_lines.append("")
    else:
        report_lines.append(f"Found {len(issues)} new submission(s):")
        report_lines.append("")
        for r in audit_results:
            status_icon = "OK" if r["status"] == "safe" else "WARN" if r["status"] == "suspicious" else "DANGER"
            report_lines.append(f"[{status_icon}] #{r['number']}: {r['title']}")
            report_lines.append(f"    By: {r['user']}")
            report_lines.append(f"    URL: {r['url']}")
            if r["issues"]:
                report_lines.append(f"    Issues: {', '.join(r['issues'])}")
            report_lines.append("")

    report_lines.append("---")
    report_lines.append(f"Total tools in database: {tools_count}")
    report_lines.append(f"Website: https://quickapis.top")

    report = "\n".join(report_lines)
    print("\n" + report)

    # Send email
    subject = f"[QuickAPIs] Daily Check - {datetime.now().strftime('%Y-%m-%d')}"
    if issues:
        subject += f" ({len(issues)} new)"
    else:
        subject += " (No new submissions)"

    send_email(subject, report)

    print("\nDone!")

if __name__ == "__main__":
    main()
