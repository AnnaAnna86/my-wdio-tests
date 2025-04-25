describe('🔑 Тест валідності полів на формі логіну', () => {
    it('повинен показати помилку, якщо поле логіну порожнє', async () => {
        // Відкриваємо сторінку логіну
        await browser.url('https://the-internet.herokuapp.com/login')

        // Порожні поля
        await $('#username').setValue('')
        await $('#password').setValue('')

        // Натискаємо кнопку "Login"
        await $('button[type="submit"]').click()

        // Перевіряємо, чи є повідомлення про помилку
        const errorMessage = await $('#flash')
        expect(await errorMessage.getText()).toContain('Your username is invalid!')
    })

    it('повинен показати помилку, якщо введено неправильний логін', async () => {
        // Відкриваємо сторінку логіну
        await browser.url('https://the-internet.herokuapp.com/login')

        // Вводимо неправильний логін
        await $('#username').setValue('wrongusername')
        await $('#password').setValue('SuperSecretPassword!')

        // Натискаємо кнопку "Login"
        await $('button[type="submit"]').click()

        // Перевіряємо, чи є повідомлення про помилку
        const errorMessage = await $('#flash')
        expect(await errorMessage.getText()).toContain('Your username is invalid!')
    })

    it('повинен показати успішний вхід, якщо введено правильні дані', async () => {
        // Відкриваємо сторінку логіну
        await browser.url('https://the-internet.herokuapp.com/login')

        // Вводимо правильний логін і пароль
        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')

        // Натискаємо кнопку "Login"
        await $('button[type="submit"]').click()

        // Перевіряємо, чи був успішний вхід
        const flashMessage = await $('#flash')
        expect(await flashMessage.getText()).toContain('You logged into a secure area!')
    })
})
