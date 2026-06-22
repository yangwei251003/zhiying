from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:3002/", wait_until="networkidle")
    page.wait_for_timeout(3000)
    
    # 检查 how-it-works section 是否存在
    section = page.locator("section:has(h2:has-text('五步完成'))")
    count = section.count()
    print(f"How it works section count: {count}")
    
    if count > 0:
        bbox = section.first.bounding_box()
        print(f"Bounding box: {bbox}")
        section.first.screenshot(path="C:\\Users\\yangwei\\WorkBuddy\\2026-06-21-04-31-50\\outputs\\screenshot-howitworks.png")
    
    browser.close()
