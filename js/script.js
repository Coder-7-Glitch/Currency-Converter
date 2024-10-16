let amountInput = document.getElementById('amountInput');
let btn = document.getElementById('btn');
let fromCountry = document.getElementById('from-which-country');
let toCountry = document.getElementById('to-which-country');
let answer = document.getElementById('answer');

btn.addEventListener('click', async () => {
    async function convertCurrency(amount, fromCurrency, toCurrency) {
        const apiKey = "e0c167cd4ab4477981d4c11dc518ee8b";
        const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            const rates = data.rates;

            const fromRate = rates[fromCurrency.toUpperCase()];
            const toRate = rates[toCurrency.toUpperCase()];

            if (!fromRate || !toRate) {
                console.error("Invalid currency code");
                return null;
            }

            // Perform the conversion
            const convertedAmount = amount * (toRate / fromRate);
            return `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`;
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
            return "Error fetching exchange rates";
        }
    }

    // Wait for the promise to resolve and set the result in the answer element
    const result = await convertCurrency(amountInput.value, fromCountry.value, toCountry.value);
    answer.innerHTML = result;
});
