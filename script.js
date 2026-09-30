
// API URL
const API_URL = "http://localhost:5062/api/vendors";


// ================================
// LOAD VENDORS
// ================================
async function loadVendors() {

    const vendorList = document.getElementById("vendorList");

    if (!vendorList) {
        return;
    }

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load vendors");
        }

        const vendors = await response.json();

        if (vendors.length === 0) {

            vendorList.innerHTML =
                "<p>No vendors registered yet.</p>";

            return;
        }

        vendorList.innerHTML = "";

        vendors.forEach(vendor => {

            const vendorCard = document.createElement("div");

            vendorCard.className = "vendor-card";

            vendorCard.innerHTML = `
                <h3>${vendor.vendorName}</h3>

                <p><strong>Phone:</strong> ${vendor.phone || "N/A"}</p>

                <p><strong>Business:</strong> ${vendor.businessName || "N/A"}</p>

                <p><strong>Vendor ID:</strong> ${vendor.vendorId}</p>

                <div class="vendor-actions">
                    <button onclick="editVendor(${vendor.vendorId})">
                        Edit
                    </button>

                    <button onclick="deleteVendor(${vendor.vendorId})">
                        Delete
                    </button>
                </div>
            `;

            vendorList.appendChild(vendorCard);

        });

    } catch (error) {

        console.error(error);

        vendorList.innerHTML =
            "<p>Unable to load vendors. Make sure the API is running.</p>";
    }
}


// ================================
// ADD VENDOR
// ================================
async function addVendor(event) {

    event.preventDefault();

    const vendorName =
        document.getElementById("vendorName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const businessName =
        document.getElementById("businessName").value.trim();

    const message =
        document.getElementById("message");


    // Basic validation
    if (!vendorName || !phone || !businessName) {

        message.innerText =
            "Please fill all fields.";

        return;
    }


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                vendorName: vendorName,
                phone: phone,
                businessName: businessName
            })

        });


        if (!response.ok) {

            throw new Error("Failed to add vendor");

        }


        const newVendor = await response.json();


        message.innerText =
            `Vendor added successfully! Vendor ID: ${newVendor.vendorId}`;


        document.getElementById("vendorForm").reset();


        loadVendors();


    } catch (error) {

        console.error(error);

        message.innerText =
            "Unable to add vendor. Please make sure the API is running.";

    }

}


// ================================
// EDIT VENDOR
// ================================
async function editVendor(id) {

    const vendorName =
        prompt("Enter new vendor name:");

    if (vendorName === null) {
        return;
    }

    const phone =
        prompt("Enter new phone number:");

    if (phone === null) {
        return;
    }

    const businessName =
        prompt("Enter new business name:");

    if (businessName === null) {
        return;
    }


    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                vendorName: vendorName.trim(),
                phone: phone.trim(),
                businessName: businessName.trim()
            })

        });


        if (!response.ok) {

            throw new Error("Failed to update vendor");

        }


        alert("Vendor updated successfully!");

        loadVendors();


    } catch (error) {

        console.error(error);

        alert("Unable to update vendor.");

    }

}


// ================================
// DELETE VENDOR
// ================================
async function deleteVendor(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this vendor?");

    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });


        if (!response.ok) {

            throw new Error("Failed to delete vendor");

        }


        alert("Vendor deleted successfully!");

        loadVendors();


    } catch (error) {

        console.error(error);

        alert("Unable to delete vendor.");

    }

}


// ================================
// FORM EVENT
// ================================
const vendorForm =
    document.getElementById("vendorForm");

if (vendorForm) {

    vendorForm.addEventListener(
        "submit",
        addVendor
    );

}


// ================================
// LOAD VENDORS WHEN DASHBOARD OPENS
// ================================
loadVendors();

