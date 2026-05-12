import os

filepath = r'C:\Users\Administrator\.qclaw\quickapis-site-temp\tools.json'

# Read as bytes to preserve CRLF exactly
with open(filepath, 'rb') as f:
    raw = f.read()

old = b'"url": "https://siliconflow.cn"'
new = b'"url": "https://cloud.siliconflow.cn/i/rdIN9OZu"'

count = raw.count(old)
if count == 0:
    print("ERROR: old url not found")
else:
    raw = raw.replace(old, new)
    with open(filepath, 'wb') as f:
        f.write(raw)
    print(f"Done - replaced {count} occurrence(s)")
