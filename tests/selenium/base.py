import os
import threading
import unittest
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait


ROOT = Path(__file__).resolve().parents[2]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


class SeleniumTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        handler = partial(QuietHandler, directory=str(ROOT))
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
        cls.server_thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.server_thread.start()
        cls.base_url = f"http://127.0.0.1:{cls.server.server_port}"

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.server_thread.join(timeout=5)

    def setUp(self):
        options = webdriver.ChromeOptions()
        options.add_argument("--headless=new")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1440,1200")
        if chrome_binary := os.environ.get("CHROME_BINARY"):
            options.binary_location = chrome_binary
        self.driver = webdriver.Chrome(options=options)
        self.wait = WebDriverWait(self.driver, 10)

    def tearDown(self):
        self.driver.quit()

    def complete_common(self, *, firstname, email, role, gender, interests):
        self.driver.get(self.base_url)
        self.driver.find_element(By.ID, "firstname").send_keys(firstname)
        self.driver.find_element(By.ID, "email").send_keys(email)
        Select(self.driver.find_element(By.ID, "role")).select_by_value(role)
        self.click_choice(f'input[name="gender"][value="{gender}"]')
        for interest in interests:
            self.click_choice(f'input[name="interest"][value="{interest}"]')

    def click_choice(self, selector):
        element = self.driver.find_element(By.CSS_SELECTOR, selector)
        self.driver.execute_script(
            "document.documentElement.style.scrollBehavior = 'auto';"
            "arguments[0].scrollIntoView({block: 'center'});",
            element,
        )
        self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, selector))).click()

    def submit_and_expect(self, expected):
        self.driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()
        status = self.wait.until(EC.visibility_of_element_located((By.ID, "success")))
        self.assertIn(expected, status.text)
