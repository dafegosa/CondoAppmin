import puppeteer from 'puppeteer'

const newAdmin = {
  name: 'Name 1',
  lastName: 'lastName 1',
  idNumber: '1827272838',
  phone: '3109393939',
  email: 'name@test.com',
  password: '12345'
}

describe('App', () => {
  let browser;
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 10 })
  })
  afterAll(async () => {
    await browser.close()
  })
  it('should sign up and admin successfully', async () => {
    const page = await browser.newPage()

    await page.goto('http://localhost:3000')

    await page.waitForSelector('a[href="/register"]')
    await page.click('a[href="/register"]')

    await page.waitForSelector('#name')
    await page.waitForSelector('#password')
    await page.type('#name', newAdmin.name)
    await page.type('#lastname', newAdmin.lastName)
    await page.type('#idnumber', newAdmin.idNumber)
    await page.type('#phone', newAdmin.phone)
    await page.type('#email', newAdmin.email)
    await page.type('#password', newAdmin.password)
    await page.click('button[type="submit"]')

    await page.waitForSelector('#message')
    const message = await page.$eval('#message', msj => msj.innerHTML)

    expect(message).toMatch(/cuenta creada exitosamente/i)
    await page.click('a[href="/login"]')

  }, 60000)

  it('should log in an admin succesfully', async () => {
    const page = await browser.newPage()

    await page.goto('http://localhost:3000')

    await page.waitForSelector('a[href="/login"]')
    await page.click('a[href="/login"]')

    await page.waitForSelector('#email')
    await page.click('#admin')
    await page.type('#email', newAdmin.email)
    await page.type('#password', newAdmin.password)
    await page.click('button[type="submit"]')
    
    await page.waitForSelector('main[data-testid="content"]')
    const content = await page.$eval('main[data-testid="content"]', el => el.innerHTML)
    expect(content).toMatch(/bienvenido al dashboard/i)

  }, 60000)
})
