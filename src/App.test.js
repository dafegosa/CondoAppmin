import puppeteer from 'puppeteer'
const mockUserEmail = 'julian@test.com'
const mockUserId = '165493246'

describe('App', () => {
  it('Should register a New Admin and redirect to login after succesfully sining up', async () => {
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
    await page.waitFor(2000)
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
    await page.waitFor(2000)
    await page.waitForSelector('div[data-testid="condo"]')
    await page.click('div[data-testid="condo"]')
    await page.waitFor(1000)
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
    await page.waitFor(2000)

    await page.click('div[data-testid="unit"]')
    await page.waitFor(1000)
    await page.waitForSelector('#addUnit')
    await page.click('#addUnit')

    await page.waitForSelector('#unitName')
    await page.type('#unitName', 'Apto. 103 - Torre 1', { delay: 100 })

    await page.click('#buttonAddUnit')
    await page.waitFor(1000)
    await page.click('#myUnits')
    await page.waitFor(2000)

    await page.click('div[data-testid="resident"]')
    await page.waitFor(1000)
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
    await page.waitFor(2000)

    await page.waitFor(2000)
    await page.click('button[class="MuiButtonBase-root MuiIconButton-root"]')
    await page.waitFor(2000)
    await page.click('#logout')
    await browser.close()
  }, 60000)
})
it('Should login a resident user and sent a ticket to admin', async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('http://localhost:3000/login')

  await page.waitForSelector('#resident')
  await page.click('#resident')
  await page.type('#email', 'adriana@test.com', { delay: 100 })
  await page.type('#password', '123456', { delay: 100 })
  await page.click('button[class="sc-dFJsGO bVUtYL"]')
  await page.waitFor(2000)
  await page.waitForSelector('div[data-testid="ticket"]')
  await page.click('div[data-testid="ticket"]')

  await page.waitForSelector('#addTicket')
  await page.click('#addTicket')

  await page.waitForSelector('#to')
  await page.type('#to', mockUserEmail, { delay: 100 })
  await page.type('#subject', 'Mi primer ticket', { delay: 100 })
  await page.type(
    'div[role="textbox"]',
    'Hola Admin, Este es un Ticket de prueba.',
    { delay: 100 }
  )
  await page.click('#buttonAddTicket')
  await page.waitFor(3000)
  await page.click('#myTickets')
  await page.waitFor(3000)
  await page.click('button[class="MuiButtonBase-root MuiIconButton-root"]')
  await page.waitFor(3000)
  await page.click('#logout')
  await page.waitFor(3000)
  await browser.close()
}, 60000)
it('Should login a admin and answer a ticket recived', async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('http://localhost:3000/login')

  await page.waitForSelector('#admin')
  await page.click('#admin')
  await page.type('#email', mockUserEmail, { delay: 100 })
  await page.type('#password', '123456', { delay: 100 })
  await page.click('button[class="sc-dFJsGO bVUtYL"]')
  await page.waitFor(2000)

  await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
  await page.waitFor(2000)
  await page.type('select#condo-select', 'Quintas del Marquez')
  await page.waitFor(1000)
  await page.click('#buttonSelectCondo')
  await page.waitFor(2000)

  await page.click('#ticketReceived')
  await page.waitFor(2000)

  await page.type(
    'div[role="textbox"]',
    'Hola Adriana, recibido el ticket, ¿En qué te puedo servir?',
    { delay: 100 }
  )
  await page.waitFor(2000)
  await page.click('#response')
  await page.waitFor(4000)
  await page.click('button[class="MuiButtonBase-root MuiIconButton-root"]')
  await page.waitFor(2000)
  await page.click('#logout')
  await browser.close()
}, 60000)
it('Should login a admin and answer a subTicket recived', async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('http://localhost:3000/login')

  await page.waitForSelector('#resident')
  await page.click('#resident')
  await page.type('#email', 'adriana@test.com', { delay: 100 })
  await page.type('#password', '123456', { delay: 100 })
  await page.click('button[class="sc-dFJsGO bVUtYL"]')
  await page.waitFor(2000)
  await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
  await page.waitFor(2000)
  await page.click('#ticketReceived')
  await page.waitFor(2000)

  await page.type(
    'div[role="textbox"]',
    'Necesito una persona del quipo de mantenimiento',
    { delay: 100 }
  )
  await page.waitFor(2000)
  await page.click('#response')
  await page.waitFor(4000)
  await page.click('button[class="MuiButtonBase-root MuiIconButton-root"]')
  await page.waitFor(2000)
  await page.click('#logout')
  await browser.close()
}, 60000)

it('Should solve a ticket', async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('http://localhost:3000/login')

  await page.waitForSelector('#admin')
  await page.click('#admin')
  await page.type('#email', mockUserEmail, { delay: 100 })
  await page.type('#password', '123456', { delay: 100 })
  await page.click('button[class="sc-dFJsGO bVUtYL"]')
  await page.waitFor(2000)

  await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
  await page.waitFor(2000)
  await page.type('select#condo-select', 'Quintas del Marquez')
  await page.click('#buttonSelectCondo')
  await page.waitFor(2000)

  await page.click('#ticketReceived')
  await page.waitFor(2000)
  await page.click('#buttonAddTicket')
  await page.waitForSelector('div[data-testid="ticket"]')
  await page.click('div[data-testid="ticket"]')
  await page.waitForSelector('#myTickets')
  await page.click('#myTickets')
  await page.waitForSelector('#ticketReceived')
  await page.click('#ticketReceived')
  await page.waitFor(2000)

  await page.click('button[class="MuiButtonBase-root MuiIconButton-root"]')
  await page.waitFor(2000)
  await page.click('#logout')
  await browser.close()
}, 60000)
