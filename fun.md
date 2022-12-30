---
description: Hướng dẫn sử dụng các lệnh Fun, giải trí, hề chúa,...
---

# 🎲 Giải trí

**<...>** là các dữ liệu yêu cầu bắt buộc phải nhập

**\[...]** là các dữ liệu không bắt buộc phải nhập

## Ngẫu nhiên

### Sinh số ngẫu nhiên

Để tạo một sinh số ngẫu nhiêu trong khoảng từ **\<min>** đến **\<max>**, hãy dùng

```
/>roll <min> <max>
```

{% hint style="info" %}
**\<min>** và **\<max>** là các số thực sao cho **\<min>** **nhỏ hơn \<max>** và kết quả trả ra sẽ là một số nguyên.
{% endhint %}

{% hint style="warning" %}
Nếu **\<min>** hoặc **\<max>** nhiều hơn 22 chữ số, bạn sẽ cần có quyền **Quản lí tin nhắn (MANAGE\_MESSAGES)** để tránh spam
{% endhint %}

![Ví dụ minh họa cho />roll](.gitbook/assets/exp.png)

### Lựa chọn ngẫu nhiên

Lựa chọn ngẫu nhiên một trong các lựa chọn bạn đưa ra :

```
/>choose <lc1> [lc2] [lc3] ... [lcn]
```

![Ví dụ minh họa cho />choose](.gitbook/assets/choose.png)

### Từ tiếng Anh ngẫu nhiên

Tạo ra cho bạn **\[ex]** cụm từ tạo bởi **\[wps]** từ tiếng Anh không quá **\[ml]** chữ, phân cách nhau bởi dấu gạch ngang

```
/>rdword [ex] [wps] [ml] 
```

{% hint style="info" %}
Bỏ trống **\[ex]** sẽ đặt **\[ex] = 1** _(đối với Slash)_

Bỏ trống **\[wps]** sẽ đặt **\[wps] = 1** _(đối với Slash)_

Đặt **\[ml] = 0** sẽ bỏ trống nó
{% endhint %}

{% hint style="warning" %}
**\[ex]**, **\[wps]**, **\[ml]** là các số tự nhiên (nếu nhập)

**\[ex]**, **\[wps]** khác 0 (nếu nhập)
{% endhint %}

{% hint style="warning" %}
Nếu **\[ex]** x **\[wps]** > **30** thì bạn sẽ cần Quyền **Quản lí tin nhắn (MANAGE\_MESSAGES)** để thực hiện lệnh
{% endhint %}

![Ví dụ minh họa cho />rdword](.gitbook/assets/exm.png)

## Chat

### Meme

Tìm cho bạn 1 meme từ [r/memes](https://www.reddit.com/r/memes), [r/meme](https://www.reddit.com/r/meme), [r/dankmeme](https://www.reddit.com/r/dankmeme) hoặc [r/dankmemes](https://www.reddit.com/r/dankmemes/)

```
/>meme
```

![Ví dụ minh họa cho />meme](<.gitbook/assets/anime (1).png>)

### Ảnh Anime

Gửi một hình ảnh anime thuộc thể loại **\[data]** cho bạn\
**\[data]** thuộc 1 trong các phần tử của tập hợp sau tương ứng với đầu ra của nó : **\[neko, kitsune, pat, hug, waifu, cry, kiss, slap, smug, punch, wink, kill, cuddle]**

Ở các kênh NSFW sẽ có thêm tùy chọn **\[data]** là **`nekolewd, boobs, lesbian, hentai`**

```
/>anime [data]
```

{% hint style="info" %}
Nếu **\[data]** không thuộc hoặc viết không đúng (phân biệt chữ hoa và chữ thường) với bất cứ giá trị nào trong tập hợp trên sẽ cho 1 hình ảnh ngẫu nhiên từ tập hợp đó
{% endhint %}

![Ví dụ minh họa cho />anime](<.gitbook/assets/anime (3).png>)

### Lời khuyên

Cho bạn 1 lời khuyên tiếng Anh mã **\[id]**. Bỏ trống **\[id]** sẽ gửi 1 lời khuyên ngẫu nhiên.

```
/>advice [id]
```

![Ví dụ minh họa cho />advice](<.gitbook/assets/anime (2).png>)

### Xâu tạo bởi kí tự

Chuyển xâu **\<text>** sang xâu cấu tạo bởi các kí tự ASCII không có trong bảng chữ cái.

```
/>ascii <text>
```

![Ví dụ minh họa cho />ascii](.gitbook/assets/anime.png)

### Đại diện nhắn tin

#### Gửi tin nhắn vào kênh hiện tại

Bot sẽ đại diện bạn chat 1 tin nhắn với nội dung **\<text>** vào kênh bạn gửi lệnh

```
/>say 0 <text>
```

{% hint style="warning" %}
Bạn phải có quyền **Quản lí tin nhắn (MANAGE\_MESSAGES)**
{% endhint %}

__[_Ví dụ minh họa cho />say 0_](https://youtu.be/yTN6BfWMqdE)__

#### Gửi tin nhắn vào kênh khác

Bot sẽ đại diện bạn chat 1 tin nhắn với nội dung **\<text>** vào kênh có ID là **\<IDc>**

```
/>say 1 <IDc> <text>
```

{% hint style="warning" %}
Bạn phải có quyền **Quản lí tin nhắn (MANAGE\_MESSAGES)** ở kênh gửi tin để thực hiện lệnh này. Bot cũng phải có quyền **Xem kênh (VIEW\_CHANNEL)** ở kênh gửi lệnh và **Gửi tin nhắn** **(SEND\_MESSAGES)** ở Kênh gửi tin mới có thể thực hiện thành công được (Bot phải có ở cả 2 server) và có thể truy cập được ở cả 2 kênh
{% endhint %}

### Trò chuyện với [SimSimi](https://www.simsimi.com/)

Nhắn tin có nội dung **\<text>** với [SimSimi](https://www.simsimi.com/) và nó sẽ trả lời bạn

```
/>simsimi <text>
```

![Ví dụ minh họa cho />simsimi](<.gitbook/assets/anime (4).png>)

{% hint style="danger" %}
Nó có thể sử dụng những **từ "đặc biệt"** để trả lời bạn. [Ví dụ](https://media.discordapp.net/attachments/890243055930728519/1051144920917885009/image.png?width=241\&height=68).
{% endhint %}

### Chatbot

Tương tự như SimSimi, nhưng cư xử có đạo đức và nói bằng tiếng Anh khi bạn nói **\<text>**

```
/>cb <text>
```

## Game và Giải trí

### Tic Tac Toe

Chơi game Tic Tac Toe 3x3 với **\<user>**, thời gian chờ chọn mỗi ô là 30s

```
/>tictactoe <user>
```

### Đào mìn

Khởi tạo game Đào mìn (Minesweeper) với **\[row]** hàng, **\[col]** cột và **\[mine]** mìn

```
/>daomin [<row> <col> <mine>]
```

{% hint style="info" %}
Để trống **\[\<row> \<col> \<mine>]** sẽ khởi tạo Đào mìn với 9 cột, 9 hàng và 10 mìn

Nếu tin nhắn xuất ra thông báo "null" tức là không thể tạo trò đào mìn
{% endhint %}

{% hint style="warning" %}
**\[row]** x **\[col]** > **\[mine]**
{% endhint %}

__[_Ví dụ minh họa cho />daomin_](https://youtu.be/xaD\_uxCS\_Cs)__

### Oản tù tì Phiên bản mở rộng

Tạo 1 game [Oản tù tì Phiên bản mở rộng](https://photo-cms-viettimes.zadn.vn/w666/Uploaded/2021/firns/2019\_03\_11/7ea25208ab4942171b58.jpg) gồm các người chơi **\<user1>**, **\<user2>**, **\[user3]**,... **\[user20]**&#x20;

Thời gian chờ Sẵn sàng tối đa 30s, Thời gian chọn tối đa 60s

```
/>oantuti <user1> <user2> [user3] ... [user20]
```

__[_Ví dụ minh họa cho />oantuti_](https://youtu.be/StffJlY71vI)__

### [Connect Four](https://youtu.be/ylZBRUJi3UQ)

Chơi game Connect Four với **\<user>**. Mỗi lượt người chơi sẽ có 60s để chọn.

```
/>connect4 <user>
```

__[_Ví dụ minh họa cho />connect4_](https://youtu.be/W6Xz3-UNyfQ)__

### Gõ nhanh

Ai gõ nhanh hơn 1 từ tiếng Anh?

```
/>type
```

### [Đoán số](https://blog.doublehelix.csiro.au/guess-my-number/)

Đoán 1 số nguyên ngẫu nhiên trong khoảng từ **\<min>** đến **\<max>**. Bạn có 3 lần thử, mỗi lần thử tối đa 60s.

```
/>gtn [<min> <max>]
```

{% hint style="info" %}
Bỏ trống **\[\<min> \<max>]** sẽ thiết đặt **\<min> = 0**, **\<max> = 10**
{% endhint %}

![Ví dụ minh họa cho />gtn](<.gitbook/assets/anime (5).png>)

### Đoán Pokemon

Đây là Pokemon gì?

```
/>pokemon
```

{% hint style="info" %}
Nhập **`stop`** để dừng chơi
{% endhint %}

__[_Ví dụ minh họa cho />pokemon_](https://youtu.be/PbUijl\_TwWA)__

### Đoán cờ

Đây là cờ nước nào?

```
/>gtf
```

{% hint style="info" %}
Nhập **`stop`** để dừng chơi
{% endhint %}

__[_Ví dụ minh họa cho />gtf_](https://youtu.be/8gxmbcLGmZ4)__

### Đoán Logo

Đây là Logo của cái gì?

```
/>gtl
```

{% hint style="info" %}
Nhập **`stop`** để dừng chơi
{% endhint %}

__[_Ví dụ minh họa cho />gtl_](https://youtu.be/AfCUyzGO0yE)__

## Together

{% hint style="warning" %}
Bạn phải ở trong 1 kênh thoại để sử dụng các lệnh này
{% endhint %}

{% hint style="success" %}
Khi sử dụng các lệnh này, bạn có thể **chơi, hoặc xem với những người cùng ở trong kênh thoại**
{% endhint %}

### **Together**

Tạo một lời mời Together Activity cho ứng dụng **\[name]** tới kênh hiện tại của bạn (không cần Discord Nitro)

```
/>together [name]
```

Để hiện những ứng dụng khả dụng, sử dụng **`/>together`**
