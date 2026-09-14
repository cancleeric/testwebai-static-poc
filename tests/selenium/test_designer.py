from selenium.webdriver.common.by import By

from .base import SeleniumTestCase


class DesignerScenarioTest(SeleniumTestCase):
    def test_david_designer_supports_multiple_interests(self):
        self.complete_common(
            firstname="david",
            email="designer.d@example.com",
            role="designer",
            gender="male",
            interests=["gaming", "movies"],
        )
        for interest in ("gaming", "movies"):
            checkbox = self.driver.find_element(
                By.CSS_SELECTOR, f'input[name="interest"][value="{interest}"]'
            )
            self.assertTrue(checkbox.is_selected())
        self.submit_and_expect("david（設計師）")
