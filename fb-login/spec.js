var fs = require('fs');
const url = 'https://facebook.com'
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    return stream.end(function () {
      return Promise.resolve()
    });
}

describe('Test fb-login', function () {
  beforeEach(function () {
    browser.driver.get(url);
    browser._takeScreenshot = () => browser.takeScreenshot()
                                    .then(png => writeScreenShot(png, './fb-login/exception.png'))
  });

  it('should add numbers', function (done) {

    var user = browser.driver.findElement(by.id('email'));
    var password = browser.driver.findElement(by.id('pass'));
    var button = browser.driver.findElement(by.css('#u_0_2'));

    user.sendKeys(USERNAME);
    password.sendKeys(PASSWORD);

    expect(user.getAttribute('value')).toEqual(USERNAME);
    expect(password.getAttribute('value')).toEqual(PASSWORD);

    button.click().then(function (){
      return browser._takeScreenshot().then(() => done())
    }, 3000);

  });

});