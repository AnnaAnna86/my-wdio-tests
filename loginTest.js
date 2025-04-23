describe('Add Value Example', () => {
    it('should add text and numbers into an input field', async () => {
        await browser.url('https://the-internet.herokuapp.com/inputs')

        const input = await $('input[type="number"]')

        await input.addValue('123')
        await input.addValue('4')

        const value = await input.getValue()

        // Jasmine-перевірка:
        expect(value).toBe('1234')
    })
})
