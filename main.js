class Auto {
    constructor(id, name, price, year, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.year = year;
        this.img = img;
    }
}

const carSedan = document.getElementById('carros');
let cars = [];

let loadCars = async () => {
    try {
        const response = await fetch("https://my-json-server.typicode.com/leokim92/api/cars");
        const data = await response.json();
        cars = data.map(x => new Auto(x.id, x.name, x.price, x.year, x.img));
        carSedan.innerHTML = cars.map(car => {
            return `
                <div class="auto-contenedor">
                    <div class="box">
                        <div class="box-img">
                            <img src="${car.img}" alt="Sedan auto acura">
                        </div>
                        <p>${car.year}</p>
                        <h3>${car.name}</h3>
                        <h2>$ ${car.price} <span>/Dia</span></h2>
                        <a data-id = ${car.id} href="#autos" class="btn">Rentar Ahora</a>
                    </div>
                </div>
            `;
        }).join("");

        const rentButtons = document.querySelectorAll('.btn')

        rentButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();

                const rentedDays = localStorage.getItem("days");

                if (rentedDays && rentedDays > 0) {
                    const carId = event.target.getAttribute('data-id');
                    const selectedCar = cars.find(car => car.id === parseInt(carId));

                    const seguro = rentedDays <= 7 ? 2000 : Math.ceil(rentedDays / 7) * 2000;
                    const totalAuto = rentedDays * selectedCar.price;
                    const iva = (totalAuto + seguro) * 0.1;
                    const total = iva + totalAuto + seguro;

                    Swal.fire({
                        title: 'Tu auto es',
                        html: `<section class="sa-container">
                        <div class="sa-img-contenedor">
                            <img src="${selectedCar.img}" alt="auto" style="width: 950px; height: auto;">  
                            <h1>${selectedCar.name}</h1>
                        </div>
                        <h2 class="presup-resumen">Resumen de cuenta</h2>
                        <div class="sa-presup-cont">
                            <div class="descripcion">
                                <p>Dias a rentar :</p>
                                <p>Tarifa del auto por los dias rentados:</p>
                                <p>Paquete seguro obligatorio (Incluye cobertura completa contra robo y/o accidente. Por semana $2000,
                                    pasando los 7 dias, se genera automáticamente un recargo por $2000 para otra semana) :</p>
                                    <div class="ivaCostoTotalText">
                                <p>IVA :</p>
                                <p>Costo total :</p>
                                </div>
                            </div>
                            <div class="dinero">
                                <p>${rentedDays}</p>
                                <p>$${totalAuto}</p>
                                <div class="seg-iva-total">
                                    <p>$${seguro}</p>
                                    <p>$${iva} </p>
                                    <p class="dineroTotal">$${total}</p>
                                </div>
                            </div>
                        </div>
                      </section>`,
                        showDenyButton: true,
                        confirmButtonText: 'Confirmar',
                        denyButtonText: `Cancelar`,
                        customClass: {
                            container: 'custom-content-class'
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire('Muchas gracias por rentar con Mex-Sal Rent a Car!!', '', 'success');
                            localStorage.removeItem('days');
                        } else if (result.isDenied) {
                            Swal.fire('Elija otro auto!', '', 'info');
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'Por favor, elige las fechas de recolección y devolución antes de rentar un auto.',
                    });
                }
            });
        });

    } catch (error) {
        console.log('error', error);
    }
};

loadCars();

function DifferenceDates(event) {
    event.preventDefault();
    let diaRecoleccion = document.getElementById("dia__recoleccion").value;
    let diaDevolucion = document.getElementById("dia_devolucion").value;

    let date1 = new Date(diaRecoleccion);
    let date2 = new Date(diaDevolucion);

    let timeDifference = date2.getTime() - date1.getTime();
    let resultDifferenceDays = timeDifference / (1000 * 60 * 60 * 24);
    localStorage.setItem("days", resultDifferenceDays)
}

document.getElementById("diferencia__dia").addEventListener("click", DifferenceDates);

document.getElementById("diferencia__dia").addEventListener("click", function (event) {
    event.preventDefault();
    const sectionAutos = document.getElementById("autos");
    sectionAutos.scrollIntoView({ behavior: "smooth" });
});


