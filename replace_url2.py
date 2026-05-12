import os

filepath = r'C:\Users\Administrator\.qclaw\quickapis-site-temp\tools.json'

with open(filepath, 'rb') as f:
    raw = f.read()

# 实际文件里 ":" 后面有两个空格
old = b'"url":  "https://siliconflow.cn"'
new = b'"url": "https://cloud.siliconflow.cn/i/rdIN9OZu"'

count = raw.count(old)
if count == 0:
    print("ERROR: old url not found even with 2 spaces")
    # debug: show what's around siliconflow.cn
    idx = raw.find(b'siliconflow.cn')
    if idx >= 0:
        print("Context:", repr(raw[idx-20:idx+40]))
else:
    raw = raw.replace(old, new)
    with open(filepath, 'wb') as f:
        f.write(raw)
    print(f"Done - replaced {count} occurrence(s)")
