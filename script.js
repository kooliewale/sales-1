// Store sidebar timelines
let sidebarTimelines = {};

document.addEventListener("DOMContentLoaded", () => {
/*******************
SIDEBAR ANIMATIONS
*******************/
  // Select all sidebar navigation switches for interaction
  const toggleSubmenu = document.querySelectorAll(".sidebarNav__switch");
  // Iterate over each submenu switch to set up individual animations
  toggleSubmenu.forEach((submenuSwitch) => {
    // Retrieve the unique identifier for each submenu
    const menuValue = submenuSwitch.getAttribute("data-sidebar");
    // Select the corresponding submenu DOM element
    const submenuWrapper = document.querySelector(
      `.submenu[data-sidebar='${menuValue}']`
    );

    // Initialize with closed state for certain tabs
    const shouldBeClosedByDefault = submenuWrapper.classList.contains(
      "closed-by-default"
    );

    // Initialize GSAP timeline for each submenu, starting in a paused state
    sidebarTimelines[menuValue] = gsap.timeline({ paused: true });

    // Check if the submenu should be closed initially
    if (shouldBeClosedByDefault) {
      // Configure animation: start closed (hidden) and animate to open (visible)
      sidebarTimelines[menuValue]
        .fromTo(submenuWrapper, { autoAlpha: 0, height: 0 }, { height: "auto" })
        .to(submenuWrapper, { autoAlpha: 1, ease: "slow(0.7,0.7,false)" });
    } else {
      // Configure animation: start open (visible) and animate to closed (hidden)
      sidebarTimelines[menuValue]
        .fromTo(
          submenuWrapper,
          { autoAlpha: 1 },
          { autoAlpha: 0, ease: "slow(0.7,0.7,false)" }
        )
        .to(submenuWrapper, { height: 0 });
    }

    // Add click event listener to each submenu switch
    submenuSwitch.addEventListener("click", (e) => {
      e.preventDefault();
      toggleSidebarAnimation(menuValue);
    });
  });

  // Function to toggle the animation of a given submenu
  function toggleSidebarAnimation(menuValue) {
    const tl = sidebarTimelines[menuValue];

    // Play or reverse based on the current progress
    if (tl.progress() === 1) {
      tl.reverse();
    } else {
      tl.play();
    }
  }

/*******************
SIDEBAR ANIMATIONS END
*******************/

/*******************
Dahboard Stagger animation
*******************/
  gsap.fromTo(
    ".grid__stagger",
    { y: 10, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power1.in" }
  );
  gsap.fromTo(
    ".addMoreChartsBtn",
    { autoAlpha: 0 },
    { autoAlpha: 1, delay: 2.5, duration: 0.5, ease: "power1.in" }
  );


/*******************
Chart.js
*******************/

  // Chart One
  const ctx = document.getElementById("line-chart").getContext("2d");
  const myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Current period",
          backgroundColor: "rgb(68, 215, 182)",
          borderColor: "#44d7b6",
          data: [70, 100, 130, 120, 180, 100],
          fill: false,
          borderWidth: 2
        },
        {
          label: "Previous year",
          backgroundColor: "rgb(77, 91, 158)",
          borderColor: "#4d5b9e",
          data: [50, 140, 50, 220, 160, 180],
          fill: false,
          borderWidth: 2
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          labels: {
            padding: 20,
            usePontstyle: true
          }
        }
      }
    }
  });

  // Chart Two
  const ctx2 = document.getElementById("doughnut").getContext("2d");
  const myDoughnutChart = new Chart(ctx2, {
    type: "doughnut",
    data: {
      labels: ["Advertising", "Market Research", "Strategy", "Consulting"],
      datasets: [
        {
          label: "My second dataset",
          backgroundColor: [
            "rgba(245, 110, 225, .3)",
            "rgba(68, 215, 182, .5)",
            "rgba(77, 91, 158, .5)",
            "rgb(75, 192, 192)"
          ],
          data: [12, 19, 3, 5]
        }
      ]
    },
    options: {
      responsive: true,
      mainAspectRatio: true,
      aspectRatio: 2,
      layout: {
        padding: {
          top: -100
        }
      },
      plugins: {
        datalabels: {
          color: "#fff",
          textAlign: "center",
          font: {
            weight: "bold",
            family: 'Poppins", sans-serif'
          }
        },
        legend: {
          labels: {
            color: "#fff",
            font: {
              size: 12,
            }
          },
          position: "left",
          display: true
        },
        title: {
          display: false
        },
        tooltip: {
          enable: true
        }
      }
    }
  });

  // Use Function to update the Doughnut Font Size
  updateFontSize(myDoughnutChart);

  // Add event listener to react to size updates
  window.addEventListener("resize", () => {
    updateFontSize(myDoughnutChart);
  });

  // Chart Three
  const ctx3 = document.getElementById("polar-area-chart").getContext("2d");

  const myPolarAreaChart = new Chart(ctx3, {
    type: "bar",
    data: {
      labels: ["Advertising", "Research", "Strategy", "Consulting"],
      datasets: [
        {
          label: "Current Period",
          backgroundColor: "#44d7b6",
          borderColor: "#161b2e",
          borderWidth: 1,
          data: [50, 100, 150, 200]
        },
        {
          label: "Previuos year",
          backgroundColor: "#6c5dd3",
          borderColor: "#4d5b9e",
          borderWidth: 1,
          data: [80, 120, 120, 160]
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          labels: {
            size: 16,
            color: "#a4a4a4"
          }
        }
      }
    }
  });
});

// Update function for Chart2 for bigger Screens
function updateFontSize(ctx) {
  const setFontSize = window.innerWidth > 1450 ? 18 : 16;

  ctx.options.plugins.legend.labels.font.size = setFontSize;
  ctx.update();
}