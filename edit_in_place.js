/*
 * created by zfw
 * 2016-08-23
 * 就地编辑组件
 * 每个人都有保持代码优雅的责任
 */

 function EditInPlaceField(id,parent,value) {
   this.id = id;
   this.value = value || "default value";
   this.parentElement = parent;
   this.createElements(this.id);
  //  绑定事件
   this.attachEvents();
 }

 EditInPlaceField.prototype = {
   createElements:function (id) {
     this.containerElement = document.createElement('div');
     this.parentElement.appendChild(this.containerElement);

     this.staticElement = document.createElement('span');
     this.containerElement.appendChild(this.staticElement);
     this.staticElement.innerHTML = this.value;

    //创建input ，类型为文本框，值为无名氏，添加到containerElement
     this.fieldElement = document.createElement('input');
     this.fieldElement.type = "text";
     this.fieldElement.value = this.value;
     this.containerElement.appendChild(this.fieldElement);

    // 创建保存按钮
    this.saveButton = document.createElement('input');
    this.saveButton.type = "button";
    this.saveButton.value = "保存";
    this.containerElement.appendChild(this.saveButton);

    // 创建取消按钮
    this.cancelButton = document.createElement('input');
    this.cancelButton.type = "button";
    this.cancelButton.value = "取消";
    this.containerElement.appendChild(this.cancelButton);

    this.convertToText();
  },
  // 将编辑框及按钮隐藏，只显示文本状态
  convertToText:function () {
    // 将文本输入框隐藏起来
    this.fieldElement.style.display = 'none';
    // 隐藏按钮
    this.saveButton.style.display = 'none';
    this.cancelButton.style.display = 'none';

    this.staticElement.style.display = 'inline';
    this.setValue(this.value);
  },

  attachEvents:function () {
    var that = this;
    // span的点击事件
    this.staticElement.addEventListener('click',function () {
      // 将状态切换为编辑状态
      that.convertToEditable();
    },false);

    // 绑定取消按钮事件，从编辑状态切换回文本状态
    this.cancelButton.addEventListener('click',function () {
      that.cancel();
    },false);

    // 保存
    this.saveButton.addEventListener('click',function () {
      that.save();
    },false);
  },

  // 将状态切换为编辑状态
  convertToEditable:function () {
    this.staticElement.style.display = 'none';
    this.fieldElement.style.display = 'inline';
    this.saveButton.style.display = 'inline';
    this.cancelButton.style.display = 'inline';
    // 设置input的value
    this.setValue(this.value);
  },

  setValue:function (value) {
    // 同步input及span
    this.fieldElement.value = value;
    this.staticElement.innerHTML = value;
  },

  cancel:function () {
    this.convertToText();
  },

  save:function () {
    this.value = this.getValue();
    this.convertToText();
  },

  getValue:function () {
    // 获取当前的值
    return this.fieldElement.value;
  }
 };
