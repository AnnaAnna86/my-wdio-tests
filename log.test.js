describe('🧪 Тест логів', () => {
    it('має вивести лог в консоль', async () => {
        console.log('✅ Це лог з тесту — має зʼявитись у консолі');

        await browser.url('https://example.com');
    });
});
