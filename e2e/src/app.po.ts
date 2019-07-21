import { browser, by, element, $$, $ } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  getImages() {
    return $$('#selection > img');
  }

  hiTextt() {
    return $('span');
  }
}
