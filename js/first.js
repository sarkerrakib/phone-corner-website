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



const items = (data) => {
    const searchResult = document.getElementById('search-result');
    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML = `
   
<div class="col">
<div class="card h-100 rounded shadow">
<img src="${data.image}" class="card-img-top w-75  mt-5 mx-auto" alt="...">
<div class="card-body">
<h5 class="card-title">${data.phone_name}</h5>
<p class="card-text">${data.brand}</p>
<a href="#" onclick ="loadPhoneDetail('${data.slug}')" class="btn btn-primary px-5">Details</a>
</div>
</div>
</div>
  
`;
    searchResult.appendChild(div);



}


const loadPhoneDetail = id => {


    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => {
            displayPhoneDetail(data.data)
            // console.log(data)
        });
}



const displayPhoneDetail = data => {
    const detailsErrorHandaling = (dataValue) => {
        if (dataValue == null || dataValue == undefined || dataValue == '') {
            return 'no data found'
        } else {
            return dataValue
        }
    }
    console.log(data);

    const phoneDetails = document.getElementById('data-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="d-flex">
            <div class="w-25 mx-auto"><img class="m-5 w-100" src="${data.image}" alt=""></div>
            <div class="w-50 mx-auto ms-5">
                <p><b>name:</b> <span class="ms-2">${data.name}</span></p>
                <p><b>brand:</b> <span class="ms-2">${data.brand}</span></p>
                <p><b>releaseDate:</b> <span class="ms-2">${detailsErrorHandaling(data.releaseDate)}</span></p>
                <p><b>chipSet:</b> <span class="ms-2">${detailsErrorHandaling(data.mainFeatures.chipSet)}</span></p>
                <p><b>displaySize:</b> <span class="ms-2">${data.mainFeatures.displaySize}</span></p>
                <p><b>memory:</b> <span class="ms-2">${data.mainFeatures.memory}</span></p>
                <p><b>sensors:</b> <span class="ms-2">${data.mainFeatures.sensors}</span></p>
                <p><b>storage:</b> <span class="ms-2">${data.mainFeatures.storage}</span></p>

                <div>
                    <h4>Others</h4>
                    <div class="ms-4">
                        <p><b>Bluetooth:</b> <span class="ms-2">${data.others.Bluetooth}</span></p>
                        <p><b>GPS:</b> <span class="ms-2">${data.others.GPS}</span></p>
                        <p><b>USB:</b> <span class="ms-2">${data.others.USB}</span></p>
                        <p><b>Radio:</b> <span class="ms-2">${data.others.Radio}</span></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    phoneDetails.appendChild(div);
}