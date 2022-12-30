---
description: >-
  Hướng dẫn cách sử dụng chức năng nghe nhạc trên Bot. Xây dựng trên mô-đun
  DisTube do một người Việt Nam làm ra.
---

# 🎶 Âm nhạc

**<...>** là các dữ liệu yêu cầu bắt buộc phải nhập

**\[...]** là các dữ liệu không bắt buộc phải nhập

{% hint style="success" %}
Nếu danh sách chờ trống trong vòng 1 phút, bot sẽ tự động thoát khỏi kênh thoại
{% endhint %}

{% hint style="success" %}
Hỗ trợ kênh nói bình thường và kênh nói Sân khấu
{% endhint %}

## Thêm một bài nhạc vào danh sách chờ

Thêm một bài nhạc vào danh sách chờ bằng cách :

```
/>play <name/link>
```

{% hint style="info" %}
Đầu tiên, bot sẽ tìm kiếm video/nhạc tên **\<name/link>** trên YouTube hoặc liên kết **\<name/link>** nếu đó là liên kết. Sau đó, bot sẽ lấy thông tin nhạc từ đó và thêm vào danh sách chờ. Hỗ trợ phát Danh sách phát
{% endhint %}

{% hint style="success" %}
Nếu nó là bài nhạc hoặc danh sách phát đầu tiên được thêm vào, bài nhạc đó hoặc bài nhạc đầu tiên trong danh sách phát đó sẽ được phát ngay lập tức.

Người phát nhạc đầu tiên, mở đầu cho hàng đợi sẽ mặc định là Chủ hàng đợi
{% endhint %}

{% hint style="success" %}
Hỗ trợ tất cả liên kết trong [đây](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md)
{% endhint %}

{% hint style="warning" %}
**Chú ý:** Không hỗ trợ chọn bài nhạc (kết hợp tìm kiếm bài nhạc) khi dùng lệnh gạch chéo lệnh này\
&#x20;           Các bài hát Spotify sẽ được tìm kiếm trên YouTube và phát. Thật buồn :((
{% endhint %}

## Các thao tác điều khiển nhạc và Danh sách chờ

### Tạm ngừng

Tạm ngừng bản nhạc đang phát để bạn có thời gian làm việc riêng của mình :

```
/>pause
```

Để tiếp tục phát bản nhạc mà bạn đã tạm ngừng, hãy sử dụng lại lệnh [**/>pause**](https://thanhgaming5550.gitbook.io/bot-thieu-nang-guide/#tam-ngung)**,** hoặc :&#x20;

```
/>resume
```

### Dừng

Để dừng phát nhạc và xóa danh sách chờ, bạn có thể dùng :

```
/>stop
```

{% hint style="danger" %}
Chỉ chủ hàng đợi, người có quyền **Tắt Âm thành viên (MUTE\_MEMBERS)/Di chuyển Thành viên (MOVE\_MEMBERS)** và những người trong [danh sách cho phép](./#xem-danh-sach-cho-phep) mới có thể sử dụng lệnh này
{% endhint %}

### Bỏ qua

Để bỏ qua bài nhạc đang phát, hãy dùng:

```
/>skip
```

{% hint style="success" %}
Tự động Dừng nếu không còn bài nhạc nào trong hàng đợi nữa
{% endhint %}

{% hint style="info" %}
Nếu như số người không tính bot trong kênh thoại bé hơn 3, mọi người trong kênh đều có thể bỏ qua bài nhạc luôn. \
Nếu số người trong kênh không tính bot từ 3 trở lên, mọi người sẽ phải biểu quyết bỏ qua bài hát. Dùng lệnh này để Bỏ phếu bỏ qua/Rút phiếu bỏ qua. Bài hát sẽ được bỏ qua khi số phiếu lớn hơn hoặc bằng **(Số người tham gia kênh)\*75%**
{% endhint %}

{% hint style="danger" %}
Chủ hàng đợi, người có quyền **Tắt Âm thành viên (MUTE\_MEMBERS)/Di chuyển Thành viên (MOVE\_MEMBERS)** và những [người trong danh sách cho phép](./#xem-danh-sach-cho-phep) có thể sử dụng lệnh này để bỏ qua luôn mà không cần thông qua bỏ phiếu
{% endhint %}

### Nghe bài trước

Để nghe bài hát đã nghe trước đó, hoặc nghe bài hát cuối cùng, dùng

```
/>previous
```

### Tua

Để tua nhạc đến vị trí **\<time>** giây, hãy dùng

```
/>seek <time>
```

### Âm lượng

Điều chỉnh âm lượng về mức **\<num>**%, hãy dùng

```
/>volume <num>
```

### Danh sách chờ

Để xem danh sách các bài nhạc đang/sẽ được phát và những thông tin liên quan, hãy dùng :

```
/>queue
```

## Tùy chọn phát nhạc

### Trộn

Nếu bạn muốn trộn các bài hát trong danh sách chờ với nhau để chúng phát ngẫu nhiên, bạn có thể dùng:

```
/>shuffle
```

### Lặp

Còn nếu bạn muốn nó phát lặp lại, lệnh này sẽ có ích :

```
/>loop [mode]
```

Các chế độ lặp (thế vào **\[mode]**, không phân biệt chữ hoa/thường**)**:&#x20;

* Tắt: **1** hoặc **off**
* Lặp bài nhạc: **2** hoặc **track** hoặc **song**
* Lặp danh sách chờ: **3** hoặc **queue** hoặc **all** hoặc **on**

Bỏ trống **\[mode]** sẽ hiển thị cách lặp hiện tại

### Tự động phát

Để bật/tắt chế độ tự động phát, dùng :&#x20;

```
/>autoplay
```

### Mod

Bạn muốn mod/ngừng mod nhạc để nó trở lên "cuốn" hơn? Hãy dùng :

```
/>filter [mode]
```

**\[mode]** là 1 trong số **PARAMETER** ở [đây](https://distube.js.org/#/docs/DisTube/stable/typedef/defaultFilters), có tác dụng tương ứng

Bỏ trống **\[mode]** sẽ hiển thị toàn bộ filter đang dùng

**\[mode] = `off` ** sẽ tắt toàn bộ filter

## Hệ thống Cho phép

Danh sách cho phép là danh sách những người có thể sử dụng [/>skip](./#bo-qua), [/>stop](./#dung) mà không cần thông qua bỏ phiếu

Mặc định khi bắt đầu một hàng chờ, Danh sách cho phép sẽ được kích hoạt.

### Thêm người vào danh sách Cho phép

Thêm **\<user>** vào danh sách Cho phép

```
/>voiceallow add <user>
```

{% hint style="danger" %}
Chỉ Chủ hàng đợi mới có thể sử dụng lệnh này
{% endhint %}

### Loại bỏ người khỏi danh sách Cho phép

Loại bỏ **\<user>** khỏi danh sách Cho phép

```
/>voiceallow remove <user>
```

{% hint style="danger" %}
Chỉ Chủ hàng đợi mới có thể sử dụng lệnh này
{% endhint %}

### Xem danh sách Cho phép

Xem những người đã được cho phép

```
/>voiceallow list
```

### Lấy Quyền chủ hàng đợi

Lấy quyền chủ hàng đợi khi người chủ cũ đã rời khỏi kênh nói

```
/>voiceallow claim
```

### Tắt Danh sách cho phép

Vô hiệu hóa danh sách cho phép. Tất cả mọi người đều sẽ có quyền như nhau

```
/>voiceallow off
```

{% hint style="danger" %}
Chỉ Chủ hàng đợi mới có thể sử dụng lệnh này
{% endhint %}

### Bật Danh sách cho phép

Kích hoạt Danh sách cho phép. Danh sách chop phép sẽ có hiệu lực.

```
/>voiceallow on
```

{% hint style="danger" %}
Chỉ Chủ hàng đợi mới có thể sử dụng lệnh này
{% endhint %}
