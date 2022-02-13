

### [RPC](https://zhuanlan.zhihu.com/p/148185963)是关于action的

client在server上执行代码块，换句话说，就是要像调用本地的函数一样去调远程函数。

客户端通过类型传递方法名称 (method) 和参数 (arguments) 到服务器，并接收回JSON或XML。

RPC APIs 通常遵循两个简单的规则:

- 端点包含要执行的操作名称。
- API调用使用恰当的HTTP动词: GET用于只读请求，POST用于其他请求。

### [REST](https://zhuanlan.zhihu.com/p/148001272) 则围绕资源

REST APIs常见的规则：

- REST是**面向资源**的，资源是URLs的一部分， 例如 /orders
- 对于每种资源，通常实现两个URLs: 一个用于集合 (collection)，如 /orders，可以查询所有的订单信息。另一个用于特定元素(specifc element)，如/orders/123456，来查询具体某一个订单的信息。
- 对于资源，我们使用**名词**而不是动词。例如，使用/orders/123456代替/getOrdersInfo/123456。
- 使用**标准的HTTP方法** (如GET、POST、UPDATE和DELETE) 来告诉服务器进行对资源的操作。
- 服务器返回标准HTTP响应状态码，来指示请求成功或失败。通常，2XX范围内的代码表示成功，3XX范围内的代码表示资源已经转移，而4XX范围内的代码表示客户端错误(比如缺少必需参数或请求太多)。5XX范围内的代码表示服务器端错误。
- REST APIs对于数据格式没有严格的限制，常见返回JSON或XML格式。这是因为JavaScript的简单性和易于使用，使得JSON已经成为现代API的标准。但是XML和其他格式可能仍然受到支持，从而方便那些已经使用类似格式的用户保留原有的格式。

#### [GraphQL](https://zhuanlan.zhihu.com/p/148187127) 一门用于API的查询语言

GraphQL允许客户端定义所需数据的结构，而服务器则返回该结构.

![preview](https://pic2.zhimg.com/v2-a3cdb08088954b8df0deab9df0af69a1_r.jpg)

