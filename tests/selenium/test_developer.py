from selenium.webdriver.common.by import By

from .base import SeleniumTestCase


class DeveloperScenarioTest(SeleniumTestCase):
    def test_charles_developer_hides_school(self):
        self.complete_common(
            firstname="charles",
            email="dev.charles@example.com",
            role="developer",
            gender="male",
            interests=["coding"],
        )
        self.assertFalse(self.driver.find_element(By.ID, "school").is_displayed())
        self.submit_and_expect("charles（工程師）")
