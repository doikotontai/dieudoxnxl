document.addEventListener('DOMContentLoaded', () => {
    // Only verify native platform
    if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform()) {
        console.log("XNXL Offshore: Initializing Capacitor Shim for File Export");

        // Override saveAs
        window.saveAs = async (blob, filename) => {
            console.log(`Capacitor Shim: Saving ${filename}...`);
            try {
                // 1. Convert Blob to Base64
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = async () => {
                    const base64data = reader.result;
                    // Remove data URI prefix
                    const base64Content = base64data.split(',')[1];

                    const { Filesystem } = Capacitor.Plugins;
                    const { FileOpener } = Capacitor.Plugins; 

                    if (!Filesystem) {
                        console.error("Capacitor Filesystem plugin not found!");
                        alert("Lỗi kỹ thuật: Không tìm thấy quyền truy cập file hệ thống.");
                        return;
                    }

                    try {
                        // 2. Write file
                        // Using 'CACHE' or 'DOCUMENTS'. DOCUMENTS is preferred for visibility but requires permissions.
                        // On Android 10+, DOCUMENTS might need scoped storage handling, but Capacitor handles it reasonably well.
                        // Let's force recursive create to be safe.
                        const result = await Filesystem.writeFile({
                            path: filename,
                            data: base64Content,
                            directory: 'DOCUMENTS',
                            recursive: true
                        });
                        console.log('File written:', result.uri);

                        // 3. Open file (if opener available)
                        if (FileOpener) {
                            await FileOpener.open({
                                filePath: result.uri,
                                contentType: blob.type || 'application/octet-stream' // fallback
                            })
                            .then(() => console.log('File opened successfully'))
                            .catch(e => {
                                console.warn('Error opening file:', e);
                                alert(`Đã lưu file thành công tại Documents!\n(Không thể mở tự động: ${e.message})`);
                            });
                        } else {
                            alert(`Đã lưu file thành công!\nĐường dẫn: ${result.uri}`);
                        }

                    } catch (e) {
                         console.error("Write error:", e);
                         alert("Lỗi khi ghi file vào máy: " + e.message);
                    }
                };
                reader.onerror = (e) => {
                    console.error("FileReader error", e);
                    alert("Lỗi đọc dữ liệu file: " + e.message);
                };
            } catch (e) {
                console.error("Shim Error", e);
                alert("Lỗi xuất file: " + e.message);
            }
        };

        console.log("XNXL Offshore: saveAs shimmed successfully for Android.");
    }
});
