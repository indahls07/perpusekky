let daftarBuku = [];
let indexEdit = -1;

const dataAwal = [
  { judul: "kimia farmasi", penulis: "Andrea Hirata", stok: 5 },
  { judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", stok: 4 },
  { judul: "basis data(kurmer)", penulis: "andi novianto", stok: 6 },
  { judul: "dasar dasar rpl", penulis: "andi novianto", stok: 3 },
  { judul: "kimia farmasi analisis", penulis: "rahayu w", stok: 5 },
  { judul: "sejarah indonesia", penulis: "sudrajat wijaya", stok: 7 },
  { judul: "perangkat lunak desain", penulis: "sumantoro", stok: 8 },
  { judul: "ipa", penulis: "mohammad nur", stok: 6 },
  { judul: "dasar dasar tkj", penulis: "andi novianto", stok: 5 },
  {
    judul: "dasar dasar teknologi farmasi",
    penulis: "hary wibawatosamoko",
    stok: 4,
  },
  {
    judul: "dasar dasar layanan kesehatan",
    penulis: "hebert ardianto",
    stok: 6,
  },
  {
    judul: "pemasanagan dann kongfigurasi jaringan",
    penulis: "andi novianto",
    stok: 3,
  },
  { judul: "farmakognasi", penulis: "hebert ardianto", stok: 7 },
  { judul: "pkk", penulis: "andi novianto", stok: 4 },
  { judul: "dasar dasar pplg", penulis: "hary wibawanto", stok: 5 },
  { judul: "pemrograman web", penulis: "andi novianto", stok: 3 },
  { judul: "dadmininstrasi jaringan", penulis: "okta p.", stok: 2 },
  {
    judul: "pjok",
    penulis: "m.azhar mssbthri indrianti agung rahayu",
    stok: 6,
  },
  {
    judul: "pendidikan agama islam",
    penulis: "H.A sholeh dimyathi",
    stok: 5,
  },
  { judul: "perangkat lunak", penulis: "sumanto kasdanhi", stok: 7 },
  { judul: "ipas", penulis: "berti sagendra", stok: 6 },
  { judul: "matematika", penulis: "erif ediyanto", stok: 5 },
  { judul: "keamanan jaringan", penulis: "andi novianto", stok: 4 },
  { judul: "basis data", penulis: "henry pandia", stok: 8 },
  { judul: "sejarah", penulis: "ratna hapsari", stok: 7 },
  { judul: "seni rupa", penulis: "sugiyanto", stok: 6 },
  { judul: "informatika", penulis: "andi novianto", stok: 5 },
  { judul: "pendidikan pancasila", penulis: "yuyus kordiman", stok: 4 },
  { judul: "Sptash", penulis: "anik.m indrastuti", stok: 6 },
];

window.onload = function () {
  if (localStorage.getItem("daftarBuku")) {
    daftarBuku = JSON.parse(localStorage.getItem("daftarBuku"));
  } else {
    daftarBuku = dataAwal;
    localStorage.setItem("daftarBuku", JSON.stringify(daftarBuku));
  }
  tampilkanBuku();
};

function simpanData() {
  localStorage.setItem("daftarBuku", JSON.stringify(daftarBuku));
}

function tambahBuku() {
  let judul = document.getElementById("judul").value;
  let penulis = document.getElementById("penulis").value;
  let stok = document.getElementById("stok").value;

  if (judul === "" || penulis === "" || stok === "") {
    alert("Isi data dulu guys!!");
    return;
  }

  daftarBuku.push({ judul, penulis, stok: parseInt(stok) });
  simpanData();
  tampilkanBuku(true);

  document.getElementById("judul").value = "";
  document.getElementById("penulis").value = "";
  document.getElementById("stok").value = "";
}

function tampilkanBuku(withAnimation = false) {
  let tbody = document.querySelector("#tabelBuku tbody");
  tbody.innerHTML = "";

  daftarBuku.forEach((buku, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${buku.judul}</td>
      <td>${buku.penulis}</td>
      <td>${buku.stok}</td>
      <td class="aksi-btn">
        <button class="edit" onclick="editBuku(${index})">Edit</button>
        <button class="hapus" onclick="hapusBuku(${index})">Hapus</button>
        <button class="pinjam" onclick="pinjamBuku(${index})">Pinjam</button>
        <button class="kembali" onclick="kembalikanBuku(${index})">Kembali</button>
      </td>
    `;
    if (withAnimation && index === daftarBuku.length - 1) {
      row.classList.add("animate");
    }
    tbody.appendChild(row);
  });
}

function hapusBuku(index) {
  if (confirm("Yakin mau dihapus pikir pikir duluu dehhh")) {
    daftarBuku.splice(index, 1);
    simpanData();
    tampilkanBuku();
  }
}

function editBuku(index) {
  document.getElementById("judul").value = daftarBuku[index].judul;
  document.getElementById("penulis").value = daftarBuku[index].penulis;
  document.getElementById("stok").value = daftarBuku[index].stok;
  indexEdit = index;
  document.getElementById("btnTambah").style.display = "none";
  document.getElementById("btnUpdate").style.display = "block";
}

function updateBuku() {
  let judul = document.getElementById("judul").value;
  let penulis = document.getElementById("penulis").value;
  let stok = document.getElementById("stok").value;

  if (judul === "" || penulis === "" || stok === "") {
    alert("Isi datanya dulu gess!!");
    return;
  }

  daftarBuku[indexEdit] = { judul, penulis, stok: parseInt(stok) };
  simpanData();
  tampilkanBuku();

  document.getElementById("judul").value = "";
  document.getElementById("penulis").value = "";
  document.getElementById("stok").value = "";
  indexEdit = -1;
  document.getElementById("btnTambah").style.display = "block";
  document.getElementById("btnUpdate").style.display = "none";
}

function pinjamBuku(index) {
  if (daftarBuku[index].stok > 0) {
    daftarBuku[index].stok--;
    simpanData();
    tampilkanBuku();
  } else {
    alert("Bukunya sudah habis, lambatkoo");
  }
}

function kembalikanBuku(index) {
  daftarBuku[index].stok++;
  simpanData();
  tampilkanBuku();
}

function cariBuku() {
  let keyword = document.getElementById("cari").value.toLowerCase();
  let tbody = document.querySelector("#tabelBuku tbody");
  tbody.innerHTML = "";

  daftarBuku
    .filter(
      (buku) =>
        buku.judul.toLowerCase().includes(keyword) ||
        buku.penulis.toLowerCase().includes(keyword)
    )
    .forEach((buku, index) => {
      let row = document.createElement("tr");
      // Perlu menghitung ulang index jika menggunakan .filter,
      // tetapi untuk kesederhanaan, kita gunakan index dari array hasil filter
      let originalIndex = daftarBuku.findIndex(
        (originalBuku) =>
          originalBuku.judul === buku.judul &&
          originalBuku.penulis === buku.penulis
      );

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${buku.judul}</td>
        <td>${buku.penulis}</td>
        <td>${buku.stok}</td>
        <td class="aksi-btn">
          <button class="edit" onclick="editBuku(${originalIndex})">Edit</button>
          <button class="hapus" onclick="hapusBuku(${originalIndex})">Hapus</button>
          <button class="pinjam" onclick="pinjamBuku(${originalIndex})">Pinjam</button>
          <button class="kembali" onclick="kembalikanBuku(${originalIndex})">Kembali</button>
        </td>
      `;
      row.classList.add("animate");
      tbody.appendChild(row);
    });
}
