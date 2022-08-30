//fetch main data
const loadPhones = (search) => {

    fetch(` https://openapi.programming-hero.com/api/phones?search=${search}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
        .catch(error => console.log(error))
}

//display main phones
const displayPhones = (phones) => {

    //alert if no phone found
    let text = document.getElementById('error');
    if (phones.length === 0) {

        text.classList.remove('d-none')

    }

    else {

        text.classList.add('d-none')
    }
    //display less phones
    phones = phones.slice(0, 12)

    let parentDiv = document.getElementById('content');
    parentDiv.textContent = '';

    //access the value and append
    for (const phone of phones) {

        let childDiv = document.createElement('div');
        childDiv.classList.add('col');

        childDiv.innerHTML =
            `
        <div class="card p-4 border-1 shadow-lg rounded-3">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
            
            <h5 class="card-title">${phone.phone_name}</h5>
            <button class="btn btn-dark mt-3" onclick="loadDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Buy Now</button>
        </div>
        </div>
        
        `
        parentDiv.appendChild(childDiv);
    }

    //loader ends
    loading(false)

}

//phone details
const loadDetails = (details) => {

    let url = ` https://openapi.programming-hero.com/api/phone/${details}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}


//display phone details on modal
const displayDetails = data => {

    let phoneTitle = document.getElementById('title');
    phoneTitle.innerText = data.name;

    let phoneinfo = document.getElementById('body');
    phoneinfo.innerHTML =
        `
        <div class="row">
        
        <div class="col-md-3">
        <img src="${data.image}" class="img-fluid w-100" alt="image">
        </div>

        <div class="col-md-9">
        <h5 class=" mx-5">Brand:${data.brand}</h5>
        <h6 class=" mx-5">Display:${data.mainFeatures.displaySize.slice(0, 10)}</h6>
        <h6 class=" mx-5">Chipset:${data.mainFeatures.chipSet}</h6>
        <h6 class=" mx-5">Memory:${data.mainFeatures.storage.slice(0, 18)}</h6>
        <h6 class=" mx-5">${data.releaseDate ? data.releaseDate : 'No realesed info'}</h6>
        </div>
    </div>

    `



}

//search phone
document.getElementById('btn').addEventListener('click', function () {

    //loader start
    loading(true);

    console.log('clicked')
    let input = document.getElementById('input');
    inputValues = input.value;

    loadPhones(inputValues);

})

//function for loader
const loading = load => {

    let spin = document.getElementById('spin');

    if (load) {

        spin.classList.remove('d-none');
    }
    else {

        spin.classList.add('d-none')
    }

}

loadPhones('apple');