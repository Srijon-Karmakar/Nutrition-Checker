document.getElementById('submitButton').addEventListener('click', async () => {
    const food = document.getElementById('foodInput').value;
    const nutritionInfoDiv = document.getElementById('nutritionInfo');

    if (food) {
        try {
            const response = await fetch(`https://api.nutritionix.com/v1_1/search/${encodeURIComponent(food)}?fields=fields.item_name,fields.nf_calories,fields.nf_protein,fields.nf_total_carbohydrate,fields.nf_total_fat&appId=YOUR_APP_ID&appKey=YOUR_API_KEY`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            console.log('API response:', data);
            
            const item = data.hits[0]?.fields;

            if (item) {
                document.getElementById('calories').textContent = item.nf_calories || 'N/A';
                document.getElementById('protein').textContent = item.nf_protein || 'N/A';
                document.getElementById('carbs').textContent = item.nf_total_carbohydrate || 'N/A';
                document.getElementById('fat').textContent = item.nf_total_fat || 'N/A';
                nutritionInfoDiv.classList.remove('hidden');
            } else {
                alert('No data found for the given food item.');
                nutritionInfoDiv.classList.add('hidden');
            }
        } catch (error) {
            console.error('Error fetching nutrition data:', error);
            alert('Error fetching nutrition data. Please try again.');
        }
    } else {
        alert('Please enter a food item.');
        nutritionInfoDiv.classList.add('hidden');
    }
});

document.getElementById('signUpForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Sign Up functionality is not implemented.');
});
