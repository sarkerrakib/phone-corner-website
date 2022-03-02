const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';

    // load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.status == true) {
                displaySearchResult(data.data)
            } else {
                errorAlert()
            }

        });

}



const errorAlert = () => {
    const errorHandalingv = document.getElementById('error-box');
    errorHandalingv.classList.remove('d-none')
    document.getElementById('search-result').style.display = 'none'
    const phoneDetails = document.getElementById('data-details');
    phoneDetails.textContent = '';

}

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = ''
    document.getElementById('data-details').innerHTML = ''
    const errorHandalingv = document.getElementById('error-box');
    errorHandalingv.classList.add('d-none')

    document.getElementById('search-result').style.display = 'flex'

    if (data.length > 20) {
        for (let i = 0; i < 20; i++) {
            const item = data[i];
            items(item)

        }




    } else if (data.length <= 20) {
        for (const item of data) {

            items(item)

        }

    }


}