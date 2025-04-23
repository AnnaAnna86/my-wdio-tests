describe('🔁 Повний цикл: логін → перевірка → логaут → перевірка', () => {
    it('повинен увійти в систему, перевірити елементи і вийти', async () => {
        // 1️⃣ Відкриваємо сторінку логіну
        console.log('🔵 1. Відкриваємо сторінку логіну')
        await browser.url('https://the-internet.herokuapp.com/login')

        // 2️⃣ Вводимо логін і пароль
        console.log('🟢 2. Вводимо правильний логін і пароль')
        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        
        // 3️⃣ Натискаємо кнопку логіну
        console.log('🟣 3. Натискаємо кнопку логіну')
        await $('button[type="submit"]').click()

        // 4️⃣ Перевіряємо, що URL змінився
        console.log('🔵 4. Перевіряємо новий URL')
        const currentUrl = await browser.getUrl()
        expect(currentUrl).toContain('/secure')

        // 5️⃣ Перевіряємо, що flash повідомлення містить успіх
        console.log('🟢 5. Перевіряємо повідомлення про успішний вхід')
        const flash = await $('#flash')
        expect(await flash.getText()).toContain('You logged into a secure area!')

        // 6️⃣ Натискаємо кнопку Logout
        console.log('🔴 6. Натискаємо Logout')
        const logoutButton = await $('a.button.secondary.radius')
        await logoutButton.click()

        // 7️⃣ Перевіряємо, що нас перекинуло назад на логін
        console.log('🔵 7. Перевіряємо, що ми повернулись на логін')
        const newUrl = await browser.getUrl()
        expect(newUrl).toBe('https://the-internet.herokuapp.com/login')

        // 8️⃣ Перевіряємо, що кнопка Logout більше не відображається
        console.log('🟡 8. Перевіряємо, що кнопки Logout вже немає')
        const logoutExists = await $('a.button.secondary.radius').isExisting()
        expect(logoutExists).toBe(false)

        // 9️⃣ Перевіряємо, що знову є повідомлення (але інше)
        console.log('🟢 9. Перевіряємо повідомлення після Logout')
        const flashAfterLogout = await $('#flash')
        expect(await flashAfterLogout.getText()).toContain('You logged out of the secure area!')

        console.log('✅ 10. Тест успішно пройшов повний цикл!')
    })
})
