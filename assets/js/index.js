// WRITE YOUR JS CODE HERE
const navBtns = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section")

const apodMainDate = document.getElementById("apod-date")
const apodDateInputView = document.getElementById("dateInput")
const apodDateInfo = document.getElementById("apod-date-info")
const apodDateInput = document.getElementById("apod-date-input")
const apodExplanation = document.getElementById("apod-explanation")
const apodImage = document.getElementById("apod-image")
const apodDateDetail = document.getElementById("apod-date-detail")
const apodTitle = document.getElementById("apod-title")


const viewBtn = document.getElementById("viewBtn")

const apodImageLoad = document.getElementById("apod-loading")


// side bar start
navBtns.forEach(function (navBtn) {
  navBtn.addEventListener("click", () => {

    navBtns.forEach(function (btns) {
      btns.classList.remove("text-blue-400", "bg-blue-500/10")
    })

    navBtn.classList.add("text-blue-400", "bg-blue-500/10")
    navBtn.classList.remove("text-slate-300")

    const navData = navBtn.getAttribute("data-section")


    sections.forEach(function (section) {
      const sectionData = section.getAttribute("id")
      if (navData == sectionData) {
        section.classList.remove("hidden")
      }
      else {
        section.classList.add("hidden")
      }

    })

  })
})

// side bar end

// Today start

let date;
let explanation
let todayImg
let title


async function getTodaysPic() {
  const apiKey = "Xl7Au7YYlmzL7S5VGdrCP2jKPwNufiOPSpMFElYT";
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
  const data = await response.json()
  date = data.date
  explanation = data.explanation
  todayImg = data.url
  title = data.title


  displayTodayPic()

}
getTodaysPic()

apodImage.classList.add("hidden")

apodImage.addEventListener("load", () => {
  apodImageLoad.classList.add("hidden")
  apodImage.classList.remove("hidden")


});

function displayTodayPic() {
  apodMainDate.innerHTML = ` Astronomy Picture of the Day - ${new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })}`
  apodDateInputView.innerHTML = `${new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  })}`
  apodExplanation.innerHTML = `${explanation}`
  apodDateInfo.innerHTML = `${date}`
  apodImage.setAttribute("src", todayImg)
  apodDateDetail.innerHTML = `${new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })}`
  apodTitle.innerHTML = `${title}`
  apodDateInput.setAttribute("value", `${date}`)

}


viewBtn.addEventListener("click", () => {
  window.open(`todayImg`)
})


// Today end



// launches start

let allResults = []


async function getLaunchesPic() {
  const response = await fetch('https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10')
  const data = await response.json()
  allResults = data.results
  displayLaunchesPic()
}

getLaunchesPic()



const mainName = document.getElementById("main-name")
const fname = document.getElementById("fname")
const lName = document.getElementById("lName")
const launchDate = document.getElementById("launchDate")
const time = document.getElementById("time")
const launchlocation = document.getElementById("location")
const country = document.getElementById("country")
const mainImage = document.getElementById("main-img")

const launchesGrid = document.getElementById("launches-grid")

function displayLaunchesPic() {

  mainName.innerHTML = allResults[0].name
  fname.innerHTML = allResults[0].launch_service_provider.name
  lName.innerHTML = allResults[0].rocket.configuration.name
  launchDate.innerHTML = new Date(allResults[0].window_end).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
  time.innerHTML = new Date(allResults[0].net).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });

  launchlocation.innerHTML = allResults[0].pad.location.name
  country.innerHTML = allResults[0].pad.location.country.name
  description.innerHTML = allResults[0].mission.description
  mainImage.setAttribute("src", allResults[0].image.image_url)



  let cartona = ``
  // console.log(allResults);
  for (let i = 1; i < allResults.length; i++) {

    cartona += ` <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
            <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
              <!-- <i class="fas fa-space-shuttle text-5xl text-slate-700"></i> -->
              <img src="${allResults[i].image.image_url}" style="height: 100%; width: 100%"; alt="">
              <div class="absolute top-3 right-3">
                <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                 ${allResults[i].status.abbrev}
                </span>
              </div>
            </div>
            <div class="p-5">
              <div class="mb-3">
                <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  ${allResults[i].name}
                </h4>
                <p class="text-sm text-slate-400 flex items-center gap-2">
                  <i class="fas fa-building text-xs"></i>
                  ${allResults[i].launch_service_provider.name}
                </p>
              </div>
              <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-calendar text-slate-500 w-4"></i>
                  <span class="text-slate-300">${new Date(allResults[i].window_end).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    })}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-clock text-slate-500 w-4"></i>
                  <span class="text-slate-300">${new Date(allResults[i].net).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    })}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-rocket text-slate-500 w-4"></i>
                  <span class="text-slate-300">${allResults[i].rocket.configuration.name}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                  <span class="text-slate-300 line-clamp-1">${allResults[i].pad.location.name}</span>
                </div>
              </div>
              <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
                <button
                  class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                  Details
                </button>
                <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                  <i class="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
`


  }

  launchesGrid.innerHTML = cartona

}


// launches end


// planets start

let allPlanets = []

async function getPlanets() {
  const response = await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets")
  const data = await response.json()

  allPlanets = data.bodies

  // console.log(allPlanets)
  displayPlanets()
}

getPlanets()





const planetsGrid = document.getElementById("planets-grid")
const planetCards = document.querySelectorAll(".planet-card")
const planetPic = document.getElementById("planet-detail-image")
const planetDetailDescription = document.getElementById("planet-detail-description")
const planetDetailName = document.getElementById("planet-detail-name")
const planetDistance = document.getElementById("planet-distance")
const planetRadius = document.getElementById("planet-radius")
const planetMass = document.getElementById("planet-mass")
const planetDensity = document.getElementById("planet-density")
const planetOrbitalPeriod = document.getElementById("planet-orbital-period")
const planetRotationalPeriod = document.getElementById("planet-rotation")
const planetMoons = document.getElementById("planet-moons")
const planetGravity = document.getElementById("planet-gravity")
const planetDiscoverer = document.getElementById("planet-discoverer")
const planetDiscoveryDate = document.getElementById("planet-discovery-date")
const planetBodyType = document.getElementById("planet-body-type")
const planetVolume = document.getElementById("planet-volume")
const fact1 = document.getElementById("planet-fact-1")
const fact2 = document.getElementById("planet-fact-2")
const fact3 = document.getElementById("planet-fact-3")
const fact4 = document.getElementById("planet-fact-4")
const planetPerihelion = document.getElementById("planet-perihelion")
const planetAphelion = document.getElementById("planet-aphelion")
const planetEccentricity = document.getElementById("planet-eccentricity")
const planetInclination = document.getElementById("planet-inclination")
const planetAxialTilt = document.getElementById("planet-axial-tilt")
const planetTemp = document.getElementById("planet-temp")
const planetEscape = document.getElementById("planet-escape")
const planetComparisonTbody = document.getElementById("planet-comparison-tbody")

const colors=["06b6d4","2563eb","fb923c","ef4444","6b7280","facc15","3b82f6","f97316"]

function displayPlanets() {
  let planetTable = ``
  let cartona = ``
  for (let i = 0; i < allPlanets.length; i++) {

    cartona += `<div onclick="aloo(${i})"
            class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
            data-planet-id="mercury" style="--planet-color: #eab308" onmouseover="this.style.borderColor='#eab30880'"
            onmouseout="this.style.borderColor='#334155'">
            <div class="relative mb-3 h-24 flex items-center justify-center">
              <img class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                src="${allPlanets[i].image}" alt="${allPlanets[i].englishName}" />
            </div>
            <h4 class="font-semibold text-center text-sm">${allPlanets[i].englishName}</h4>
            <p class="text-xs text-slate-400 text-center">${(allPlanets[i].semimajorAxis / 149600000).toFixed(2)} AU</p>
          </div>`


    planetTable += `         <!-- Mercury -->
                  <tr class="hover:bg-slate-800/30 transition-colors">
                    <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
                      <div class="flex items-center space-x-2 md:space-x-3">
                        <div class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0" style="background-color: #${colors[i]}">
                        </div>
                        <span class="font-semibold text-sm md:text-base whitespace-nowrap">${allPlanets[i].englishName}</span>
                      </div>
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${(allPlanets[i].semimajorAxis / 149600000).toFixed(2)}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${Math.trunc(allPlanets[i].meanRadius) * 2}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${((allPlanets[i].mass.massValue * 10 ** allPlanets[i].mass.massExponent) / (5.97237 * 10 ** 24)).toFixed(3)}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                       ${((allPlanets[i].sideralOrbit) / 365).toFixed(3)} years
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
                      ${allPlanets[i].moons ? allPlanets[i].moons.length : 0}
                    </td>
                    <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span class="px-2 py-1 rounded text-xs bg-orange-500/50 text-orange-200">${allPlanets[i].type}</span>
                    </td>
                  </tr>`


    

  }

  console.log()

  planetsGrid.innerHTML = cartona

  planetComparisonTbody.innerHTML = planetTable


}


function aloo(i) {
  // alert(`aywa ana rakam ${i}`)
  planetPic.setAttribute("src", allPlanets[i].image)
  planetDetailDescription.innerHTML = allPlanets[i].description
  planetDetailName.innerHTML = allPlanets[i].englishName
  planetDistance.innerHTML = `${(allPlanets[i].semimajorAxis / 1000000).toFixed(1)}M km `
  planetRadius.innerHTML = `${Math.trunc(allPlanets[i].meanRadius)} km `
  planetMass.innerHTML = `${allPlanets[i].mass.massValue} × 10^${allPlanets[i].mass.massExponent} kg`
  planetDensity.innerHTML = `${(allPlanets[i].density.toFixed(2))} g/cm³`
  planetOrbitalPeriod.innerHTML = `${(allPlanets[i].sideralOrbit).toFixed(2)} days`
  planetRotationalPeriod.innerHTML = `${(allPlanets[i].sideralRotation).toFixed(2)} hours`
  planetMoons.innerHTML = allPlanets[i].moons ? allPlanets[i].moons.length : 0
  planetGravity.innerHTML = `${(allPlanets[i].gravity).toFixed(2)} m/s²`
  planetDiscoverer.innerHTML = allPlanets[i].discoveredBy ? allPlanets[i].discoveredBy : "Known since antiquity"
  planetDiscoveryDate.innerHTML = allPlanets[i].discoveryDate ? allPlanets[i].discoveryDate : "Ancient times"
  planetBodyType.innerHTML = allPlanets[i].bodyType
  planetVolume.innerHTML = `${allPlanets[i].vol.volValue} × 10^${allPlanets[i].vol.volExponent} km³`
  fact1.innerHTML = `Mass: ${allPlanets[i].mass.massValue} × 10^${allPlanets[i].mass.massExponent} kg`
  fact2.innerHTML = `Surface gravity: ${(allPlanets[i].gravity).toFixed(2)} m/s²`
  fact3.innerHTML = `Density: ${(allPlanets[i].density.toFixed(2))} g/cm³`
  fact4.innerHTML = `Axial tilt: ${allPlanets[i].axialTilt}°`
  planetPerihelion.innerHTML = `${(allPlanets[i].perihelion / 1000000).toFixed(1)}M km`
  planetAphelion.innerHTML = `${(allPlanets[i].aphelion / 1000000).toFixed(1)}M km`
  planetEccentricity.innerHTML = allPlanets[i].eccentricity
  planetInclination.innerHTML = `${allPlanets[i].inclination}°`
  planetAxialTilt.innerHTML = `${allPlanets[i].axialTilt}°`
  planetTemp.innerHTML = `${allPlanets[i].avgTemp}°C`
  planetEscape.innerHTML = `${(allPlanets[i].escape / 1000).toFixed(2)} km/s`

}

// planets end

