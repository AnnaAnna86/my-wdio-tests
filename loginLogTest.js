describe('Demo test with logs', () => {
    it('should log each step', async () => {
        console.log('🔵 1. Переходимо на сторінку логіну')
        await browser.url('https://the-internet.herokuapp.com/login')

        console.log('🟢 2. Знаходимо поле username')
        const username = await $('#username')

        console.log('🟡 3. Вводимо невірний логін')
        await username.setValue('wrongUser')

        console.log('🔵 4. Знаходимо поле password')
        const password = await $('#password')

        console.log('🟢 5. Вводимо невірний пароль')
        await password.setValue('wrongPass')

        console.log('🟡 6. Натискаємо кнопку логіну')
        const loginButton = await $('button[type="submit"]')
        await loginButton.click()

        console.log('🔴 7. Чекаємо повідомлення про помилку')
        const flash = await $('#flash')

        console.log('🟢 8. Перевіряємо, що повідомлення видно')
        expect(await flash.isDisplayed()).toBe(true)

        console.log('✅ 9. Тест завершено успішно')
    })
})
