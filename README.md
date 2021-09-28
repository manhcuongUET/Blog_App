<!-- 
  -- Mọi người chú ý nhé: 
     1. Mình đã tạo hết các feature(module) cho từng bạn rồi nên là cứ tạo component trong  feature của mình thôi
     tuyệt đối không sửa ngoài feature của mình. Nếu thấy cái nào chưa hợp lý thì ping mình rồi đưa ra lý do. Nếu oke
     mk sẽ sửa. Còn không thì ae đừng động vào bên ngoài nhé. Cái ae được động vào duy nhất là phần model bên trong 
     thằng core để define ra cái model của mình

     2. Cách sử dụng thằng message và spinner
        2.1 sử dụng thằng message:
          b1: inject messageService vào constructor
          b2: dùng method: sendMessae({title: string, type: 'red'/'success'}) 
             red: là thất bại/lỗi , success là thành công
             title là tiêu đề của message hiển thị lên
        2.2 sử dụng spinner
          b1: inject spinnerService vao contructor
          b2: dùng method: onLoadObserver tham số là một observable truyền vào(cái cần load) sau đó subcribe 
          vd: this.spinnerService.onLoadObserver(searchArticle$).subcribe(res => { 
            làm gì đó tiếp theo , gán kết quả cho thằng nào đó thẳng hạn 
            this.listArticles = res;
          });
          // xong
      3. là sửa lại cái selector theo feature của mình nhé. vd: app-editor-article => editor-aricle 

 -->
