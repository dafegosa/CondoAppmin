import puppeteer from 'puppeteer'
const mockUserEmail = 'julian4@test.com'
const mockUserId = '165493246a'

describe('App', () => {
  xit('Should register a New Admin and redirect to login after succesfully sining up', async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/')

    await page.waitForSelector('a[href="/register"]')
    await page.click('a[href="/register"]')

    await page.waitForSelector('#name')
    await page.type('#name', 'Julian David  ', { delay: 100 })
    await page.type('#lastname', 'Barinas Pabón', { delay: 100 })
    await page.type('#idnumber', mockUserId, { delay: 100 })
    await page.type('#phone', '3156843400', { delay: 100 })
    await page.type('#email', mockUserEmail, { delay: 100 })
    await page.type('#password', '123456', { delay: 100 })
    await page.click('button[class="sc-dFJsGO bVUtYL"]')
    await page.waitForSelector('#successMessage')
    await page.waitFor(1000)
    await browser.close()
  }, 30000)

  it('Should redirect to home after successfull login', async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/login')

    await page.waitForSelector('#admin')
    await page.click('#admin')
    await page.type('#email', mockUserEmail, { delay: 100 })
    await page.type('#password', '123456', { delay: 100 })
    await page.click('button[class="sc-dFJsGO bVUtYL"]')

    await page.waitForSelector('div[data-testid="condo"]')
    await page.click('div[data-testid="condo"]')

    await page.waitForSelector('#addCondo')
    await page.click('#addCondo')

    await page.waitForSelector('#condoName')
    await page.type('#condoName', 'Quintas del Marquez', { delay: 100 })
    await page.type('#condoAddress', 'Calle 116 No. 25a-32', { delay: 100 })
    await page.click('#buttonSubmit')
    await page.waitFor(1000)
    await page.click('#myCondos')
    await page.type('select#condo-select', 'Quintas del Marquez')
    await page.click('#buttonSelectCondo')
    await page.waitFor(3000)

    await page.click('div[data-testid="unit"]')

    await page.waitForSelector('#addUnit')
    await page.click('#addUnit')

    await page.waitForSelector('#unitName')
    await page.type('#unitName', 'Apto. 103 - Torre 1', { delay: 100 })

    await page.click('#buttonAddUnit')
    await page.waitFor(1000)
    await page.click('#myUnits')
    await page.waitFor(3000)

    await page.click('div[data-testid="resident"]')

    await page.waitForSelector('#addResident')
    await page.click('#addResident')

    await page.waitForSelector('#resName')
    await page.type('#resName', 'Adriana Marcela', { delay: 100 })
    await page.type('#resLastname', 'Pabón', { delay: 100 })
    await page.type('#resIdNumber', '204587596', { delay: 100 })
    await page.type('#resPhone', '3184587549', { delay: 100 })
    await page.type('#resEmail', 'adriana@test.com', { delay: 100 })
    await page.type('select#service-select', 'Apto. 103 - Torre 1')
    await page.type('#resPassword', '123456', { delay: 100 })
    await page.click('#buttonAddResident')
    await page.waitFor(3000)

    await browser.close()
  }, 60000)
})
