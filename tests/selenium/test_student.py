from selenium.webdriver.common.by import By

from .base import SeleniumTestCase


class StudentScenarioTest(SeleniumTestCase):
    def test_apple_student_requires_school(self):
        self.complete_common(
            firstname="apple",
            email="test@example.com",
            role="student",
            gender="female",
            interests=["movies"],
        )
        school = self.driver.find_element(By.ID, "school")
        self.assertTrue(school.is_displayed())
        school.send_keys("台灣大學")
        self.submit_and_expect("apple（學生）")
