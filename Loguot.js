describe('🔁 Повний цикл: логін → перевірка → логaут → перевірка', () => {
    it('повинен увійти в систему, перевірити елементи і вийти', async () => {

        // 1️⃣ Відкриваємо сторінку логіну
        await browser.url('https://the-internet.herokuapp.com/login')
        console.log('🔵 Сторінка логіну відкрита')

        // 2️⃣ Вводимо логін і пароль
        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        console.log('🟢 Логін і пароль введені')

        // 3️⃣ Натискаємо кнопку логіну
        await $('button[type="submit"]').click()
        console.log('🟣 Натиснута кнопка логіну')

        // 4️⃣ Чекаємо на зміну URL
        await browser.waitUntil(async () => {
            const url = await browser.getUrl()
            return url.includes('/secure')
        }, {
            timeout: 5000,
            timeoutMsg: '❌ URL не змінився на /secure'
        })
        console.log('🔵 URL змінився успішно')

        // 5️⃣ Перевіряємо flash-повідомлення
        const flash = await $('#flash')
        const flashText = await flash.getText()
        console.log('📩 Flash-повідомлення:', flashText)
        expect(flashText).toContain('You logged into a secure area!')

        // 6️⃣ Натискаємо Logout
        const logoutBtn = await $('a.button.secondary.radius')
        await logoutBtn.click()
        console.log('🔴 Натиснуто кнопку Logout')

        // 7️⃣ Перевіряємо, що нас повернули на логін-сторінку
        const newUrl = await browser.getUrl()
        expect(newUrl).toBe('https://the-internet.herokuapp.com/login')
        console.log('🔵 Повернулися на сторінку логіну')

        // 8️⃣ Перевіряємо, що кнопки Logout вже немає
        const logoutExists = await $('a.button.secondary.radius').isExisting()
        expect(logoutExists).toBe(false)
        console.log('🟡 Кнопка Logout зникла')

        // 9️⃣ Перевіряємо повідомлення після Logout
        const flashAfterLogout = await $('#flash')
        const logoutMessage = await flashAfterLogout.getText()
        console.log('📩 Повідомлення після Logout:', logoutMessage)
        expect(logoutMessage).toContain('You logged out of the secure area!')

        console.log('✅ Повний цикл тесту пройшов успішно!')
    })
})

