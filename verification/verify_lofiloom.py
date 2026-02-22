from playwright.sync_api import sync_playwright

def verify_lofiloom():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:5173/")
            page.goto("http://localhost:5173/")
            
            print("Waiting for LofiLoom text...")
            page.wait_for_selector("text=LofiLoom")
            
            print("Taking screenshot...")
            page.screenshot(path="verification/lofiloom.png")
            print("Screenshot saved to verification/lofiloom.png")
            
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_lofiloom()
