---
title: 全局异常
---
# 目录

[[toc]]

## 全局异常处理

### 新建全局异常处理类

新建一个 `GlobalExceptionHandler` 全局异常处理类，然后加上 `@ControllerAdvice` 注解即可拦截项目中抛出的异常

> `@ControllerAdvice` 注解包含了 `@Component` 注解，说明在 `Spring Boot` 启动时，也会把该类作为组件交给 `Spring` 来管理，除此之外，该注解还有个 `basePackages` 属性， 该属性是用来拦截哪个包中的异常信息

~~~java
@ControllerAdvice
@ResponseBody // 用于返回JSON数据
public class GlobalExceptionHandler {
    // 打印log
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
	// ……
}
~~~

### 通过 `@ExceptionHandler` 注解来指定具体的异常

~~~java
@ExceptionHandler(MissingServletRequestParameterException.class)
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public JsonResult handleHttpMessageNotReadableException(
        MissingServletRequestParameterException ex){
        logger.error("缺少请求参数，{}",ex.getMessage());
        return new JsonResult("400","缺少必要的请求参数");
}
~~~

### 全部代码

~~~java
@ControllerAdvice
@ResponseBody // 用于返回JSON数据
public class GlobalExceptionHandler {
    // 打印log
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
	
    @ExceptionHandler(MissingServletRequestParameterException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public JsonResult handleHttpMessageNotReadableException(
        MissingServletRequestParameterException ex){
        logger.error("缺少请求参数，{}",ex.getMessage());
        // JsonResult 为自定义返回结果类
        return new JsonResult("400","缺少必要的请求参数");
	}
}
~~~

## 自定义异常

### 定义类，实现`RuntimeException`

~~~java
/**
 * 自定义运行时异常
 *
 */
public class BusinessErrorException extends RuntimeException {
    private static final long serialVersionUID = -7480022450501760611L;
    /**
     * 异常码
     */
    private String code;
    /**
     * 异常提示信息
     */
    private String message;

    public BusinessErrorException() {
        this.code = businessMsgEnum.code();
        this.message = businessMsgEnum.msg();
    }
	// get set方法
}

~~~

### 定义异常信息枚举类

~~~java
public enum BusinessMsgEnum {
    /**
     * 参数异常
     */
    PARMETER_EXCEPTION("102", "参数异常!"),
    /**
     * 等待超时
     */
    SERVICE_TIME_OUT("103", "服务调用超时！"),
    /**
     * 参数过大
     */
    PARMETER_BIG_EXCEPTION("102", "输入的图片数量不能超过50张!"),
    /**
     * 500 : 一劳永逸的提示也可以在这定义
     */
    UNEXPECTED_EXCEPTION("500", "系统发生异常，请联系管理员！");
	// 还可以定义更多的业务异常
    /**
     * 消息码
     */
    private String code;
    /**
     * 消息内容
     */
    private String msg;

    private BusinessMsgEnum(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }
	// set get方法
}
~~~

### 在全局异常处理器拦截自定义异常

在全局异常处理器中定义方法拦截自定义异常，参考前面说的全局异常处理，这里就不展示了

### 模拟抛出

~~~java
@RestController
@RequestMapping("/exception")
public class ExceptionController {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionController.class);

    @GetMapping("/business")
    public JsonResult testException() {
        try {
            int i = 1 / 0;
        } catch (Exception e) {
            throw new BusinessErrorException(BusinessMsgEnum.UNEXPECTED_EXCEPTION);
        }
        return new JsonResult();
    }
}
~~~

