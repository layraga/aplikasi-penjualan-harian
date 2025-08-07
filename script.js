// Harga produk
const harga = {
    nasi3k: 3000,
    nasi5k: 5000,
    minuman: 1000,
    kerupuk: 1000,
    kuePuksi: 1000,
    kueBasa: 1000
};

// Fungsi untuk menyimpan stok awal ke localStorage
function simpanStokAwal() {
    const stokAwal = {
        nasi3k: document.getElementById('stokNasi3k').value,
        nasi5k: document.getElementById('stokNasi5k').value,
        minuman: document.getElementById('stokMinuman').value,
        kerupuk: document.getElementById('stokKerupuk').value,
        kuePuksi: document.getElementById('stokKuePuksi').value,
        kueBasa: document.getElementById('stokKueBasa').value
    };
    localStorage.setItem('stokAwalPenjualan', JSON.stringify(stokAwal));
}

// Fungsi untuk memuat stok awal dari localStorage
function muatStokAwal() {
    const dataStokAwal = localStorage.getItem('stokAwalPenjualan');
    if (dataStokAwal) {
        const stokAwal = JSON.parse(dataStokAwal);
        document.getElementById('stokNasi3k').value = stokAwal.nasi3k;
        document.getElementById('stokNasi5k').value = stokAwal.nasi5k;
        document.getElementById('stokMinuman').value = stokAwal.minuman;
        document.getElementById('stokKerupuk').value = stokAwal.kerupuk;
        document.getElementById('stokKuePuksi').value = stokAwal.kuePuksi;
        document.getElementById('stokKueBasa').value = stokAwal.kueBasa;
    }
}

// Fungsi utama untuk menghitung penjualan
function hitungPenjualan(event) {
    if (event) {
        event.preventDefault();
    }

    // Ambil data stok awal
    const stokNasi3k = parseInt(document.getElementById('stokNasi3k').value) || 0;
    const stokNasi5k = parseInt(document.getElementById('stokNasi5k').value) || 0;
    const stokMinuman = parseInt(document.getElementById('stokMinuman').value) || 0;
    const stokKerupuk = parseInt(document.getElementById('stokKerupuk').value) || 0;
    const stokKuePuksi = parseInt(document.getElementById('stokKuePuksi').value) || 0;
    const stokKueBasa = parseInt(document.getElementById('stokKueBasa').value) || 0;

    // Ambil data sisa barang
    const sisaNasi3k = parseInt(document.getElementById('sisaNasi3k').value) || 0;
    const sisaNasi5k = parseInt(document.getElementById('sisaNasi5k').value) || 0;
    const sisaMinuman = parseInt(document.getElementById('sisaMinuman').value) || 0;
    const sisaKerupuk = parseInt(document.getElementById('sisaKerupuk').value) || 0;
    const sisaKuePuksi = parseInt(document.getElementById('sisaKuePuksi').value) || 0;
    const sisaKueBasa = parseInt(document.getElementById('sisaKueBasa').value) || 0;

    // Hitung jumlah barang yang laku terjual
    const lakuNasi3k = Math.max(0, stokNasi3k - sisaNasi3k);
    const lakuNasi5k = Math.max(0, stokNasi5k - sisaNasi5k);
    const lakuMinuman = Math.max(0, stokMinuman - sisaMinuman);
    const lakuKerupuk = Math.max(0, stokKerupuk - sisaKerupuk);
    const lakuKuePuksi = Math.max(0, stokKuePuksi - sisaKuePuksi);
    const lakuKueBasa = Math.max(0, stokKueBasa - sisaKueBasa);

    // Hitung total uang per item
    const jumlahUangNasi3k = lakuNasi3k * harga.nasi3k;
    const jumlahUangNasi5k = lakuNasi5k * harga.nasi5k;
    const jumlahUangMinuman = lakuMinuman * harga.minuman;
    const jumlahUangKerupuk = lakuKerupuk * harga.kerupuk;
    const jumlahUangKuePuksi = lakuKuePuksi * harga.kuePuksi;
    const jumlahUangKueBasa = lakuKueBasa * harga.kueBasa;

    // Hitung total barang yang laku
    const totalBarangLaku = lakuNasi3k + lakuNasi5k + lakuMinuman + lakuKerupuk + lakuKuePuksi + lakuKueBasa;

    // Hitung total pemasukan
    const totalPemasukan = jumlahUangNasi3k + jumlahUangNasi5k + jumlahUangMinuman + jumlahUangKerupuk + jumlahUangKuePuksi + jumlahUangKueBasa;

    // Tampilkan hasil
    document.getElementById('totalPemasukan').textContent = `Rp ${totalPemasukan.toLocaleString('id-ID')}`;
    document.getElementById('totalBarangLaku').textContent = totalBarangLaku;

    document.getElementById('lakuNasi3k').textContent = lakuNasi3k;
    document.getElementById('jumlahUangNasi3k').textContent = `Rp ${jumlahUangNasi3k.toLocaleString('id-ID')}`;

    document.getElementById('lakuNasi5k').textContent = lakuNasi5k;
    document.getElementById('jumlahUangNasi5k').textContent = `Rp ${jumlahUangNasi5k.toLocaleString('id-ID')}`;

    document.getElementById('lakuMinuman').textContent = lakuMinuman;
    document.getElementById('jumlahUangMinuman').textContent = `Rp ${jumlahUangMinuman.toLocaleString('id-ID')}`;
    
    document.getElementById('lakuKerupuk').textContent = lakuKerupuk;
    document.getElementById('jumlahUangKerupuk').textContent = `Rp ${jumlahUangKerupuk.toLocaleString('id-ID')}`;

    document.getElementById('lakuKuePuksi').textContent = lakuKuePuksi;
    document.getElementById('jumlahUangKuePuksi').textContent = `Rp ${jumlahUangKuePuksi.toLocaleString('id-ID')}`;

    document.getElementById('lakuKueBasa').textContent = lakuKueBasa;
    document.getElementById('jumlahUangKueBasa').textContent = `Rp ${jumlahUangKueBasa.toLocaleString('id-ID')}`;
}

// Fungsi untuk mencetak laporan sebagai gambar
function cetakSebagaiGambar() {
    const laporanElement = document.getElementById('laporan');
    
    html2canvas(laporanElement, {
        scale: 2, 
        useCORS: true,
        backgroundColor: '#e9f5ff'
    }).then(canvas => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `Laporan-Penjualan-${new Date().toLocaleDateString('id-ID')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Fungsi untuk mencetak laporan sebagai PDF
function cetakSebagaiPdf() {
    const laporanElement = document.getElementById('laporan');

    // Menggunakan window.jsPDF.jsPDF untuk memastikan library dimuat dengan benar
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    doc.setFontSize(22);
    doc.text('Laporan Penjualan Harian', 105, 20, null, null, 'center');
    doc.setFontSize(12);
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 105, 30, null, null, 'center');

    // Mendapatkan elemen HTML dan mengubahnya menjadi gambar untuk dimasukkan ke PDF
    html2canvas(laporanElement, {
        scale: 2, 
        useCORS: true,
        backgroundColor: '#e9f5ff'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg');
        const imgWidth = 190; // Lebar gambar dalam mm
        const pageHeight = 295; // Tinggi halaman A4 dalam mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 40; // Posisi awal gambar

        // Menambahkan gambar ke PDF
        doc.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Jika gambar terlalu panjang, buat halaman baru
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Menyimpan file PDF
        doc.save(`Laporan-Penjualan-${new Date().toLocaleDateString('id-ID')}.pdf`);
    });
}

// Event listener untuk tombol submit dan cetak
document.getElementById('formPenjualan').addEventListener('submit', hitungPenjualan);
document.getElementById('cetakGambarButton').addEventListener('click', cetakSebagaiGambar);
document.getElementById('cetakPdfButton').addEventListener('click', cetakSebagaiPdf);

// Simpan stok awal saat ada perubahan input
document.getElementById('formPenjualan').querySelectorAll('input[type="number"]').forEach(input => {
    if (input.id.startsWith('stok')) {
        input.addEventListener('change', simpanStokAwal);
    }
});

// Muat data saat halaman pertama kali dibuka
document.addEventListener('DOMContentLoaded', () => {
    muatStokAwal();
    hitungPenjualan();
});