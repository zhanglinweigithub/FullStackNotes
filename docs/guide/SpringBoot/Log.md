---
title: 日志
---
# 目录

[[toc]]

## slf4j 日志

SpringBoot内部已经继承了 `slf4j` ，配置即用

### 配置

~~~yaml
logging:
	pattern:
		console: %d{yyyy/MM/dd-HH:mm:ss} [%thread] %-5level %logger- %msg%n # 控制台的输出格式 
		file: %d{yyyy/MM/dd-HH:mm} [%thread] %-5level %logger- %msg%n # 日志文件的输出格式  
	file: # 日志输出到文件中
		path: ./logs # 指定输出的文件为当前项目路径的 logs 文件下，默认生成的日志文件为 spring.log 
	config: logback-spring.xml # 指定项目启动的时候，读取哪个配置文件
	level: # 指定具体的 mapper 中日志的输出级别
		com.zhang.linwei.dao: trace #该包下的所有mapper日志，trace 会打印sql
		# ERROR、WARN、INFO、DEBUG
~~~

编码含义：

- %d{HH:mm:ss.SSS}——日志输出时间 
- %thread——输出日志的进程名字，这在Web应用以及异步任务处理中很有用 
- %-5level——日志级别，并且使用5个字符靠左对齐 
- %logger- ——日志输出者的名字 
- %msg——日志消息 
- %n——平台的换行符  

### 使用

#### 标注注解

在需要使用的类上标注注解

~~~java
@Slf4j
class DemoApplicationTests {
 	@Test
 	public void test(){
  		log.debug("输出DEBUG日志.......");
 	}
}

~~~

或

~~~java
@Slf4j
class DemoApplicationTests {
    private final static Logger logger = LoggerFactory.getLogger(TestController.class);

 	@Test
 	public void test(){
  		logger.debug("=====测试日志debug级别打印====");
		logger.info("======测试日志info级别打印=====");
		logger.error("=====测试日志error级别打印====");
		logger.warn("======测试日志warn级别打印=====");
		// 可以使用占位符打印出一些参数信息
		String str1 = "zhanglinwei";
		String str2 = "真帅";
		logger.info("======人物描述：{}；特点：{}", str1, str2);
 	}
}
~~~

### 自定义日志配置

`Spring Boot`官方推荐优先使用带有`-spring`的文件名作为你的日志配置。

因此只需要在 `src/resources` 文件夹下创建 `logback-spring.xml` 即可

配置文件内容如下：  

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan="true" scanPeriod="60 seconds" debug="false">
	<!-- 定义日志存放目录 -->
	<property name="logPath" value="logs"/>
	<!-- 日志输出的格式-->
	<property name="PATTERN" value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t-%L] %-5level %logger{36} %L %M -
%msg%xEx%n"/>
	<contextName>logback</contextName>
  
	<!--输出到控制台 ConsoleAppender-->
	<appender name="consoleLog" class="ch.qos.logback.core.ConsoleAppender">
		<!--展示格式 layout-->
		<layout class="ch.qos.logback.classic.PatternLayout">
			<pattern>${PATTERN}</pattern>
		</layout>
<!--过滤器，只有过滤到指定级别的日志信息才会输出，如果level为ERROR，那么控制台只会输出
ERROR日志-->
<!-- <filter class="ch.qos.logback.classic.filter.ThresholdFilter">-->
<!-- <level>ERROR</level>-->
<!-- </filter>-->
	</appender>
  
	<!--正常的日志文件，输出到文件中-->
  <appender name="fileDEBUGLog" class="ch.qos.logback.core.rolling.RollingFileAppender">
		<!--如果只是想要 Info 级别的日志，只是过滤 info 还是会输出 Error 日志，因为 Error 的级别高，
			所以我们使用下面的策略，可以避免输出 Error 的日志-->
		<filter class="ch.qos.logback.classic.filter.LevelFilter">
			<!--过滤 Error-->
			<level>Error</level>
			<!--匹配到就禁止-->
			<onMatch>DENY</onMatch>
			<!--没有匹配到就允许-->
			<onMismatch>ACCEPT</onMismatch>
		</filter>
		<!--日志名称，如果没有File 属性，那么只会使用FileNamePattern的文件路径规则
			如果同时有<File>和<FileNamePattern>，那么当天日志是<File>，明天会自动把今天
			的日志改名为今天的日期。即，<File> 的日志都是当天的。-->
		<File>${logPath}/log_demo.log</File>
		<!--滚动策略，按照时间滚动 TimeBasedRollingPolicy-->
		<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
			<!--文件路径,定义了日志的切分方式——把每一天的日志归档到一个文件中,以防止日志填满整个
				磁盘空间-->
			<FileNamePattern>${logPath}/log_demo_%d{yyyy-MM-dd}.log</FileNamePattern>
			<!--只保留最近90天的日志-->
			<maxHistory>90</maxHistory>
			<!--用来指定日志文件的上限大小，那么到了这个值，就会删除旧的日志-->
			<!--<totalSizeCap>1GB</totalSizeCap>-->
		</rollingPolicy>
		<!--日志输出编码格式化-->
		<encoder>
			<charset>UTF-8</charset>
			<pattern>${PATTERN}</pattern>
		</encoder>
	</appender>
  
	<!--输出ERROR日志到指定的文件中-->
	<appender name="fileErrorLog" class="ch.qos.logback.core.rolling.RollingFileAppender">
		<!--如果只是想要 Error 级别的日志，那么需要过滤一下，默认是 info 级别的，ThresholdFilter-->
		<filter class="ch.qos.logback.classic.filter.ThresholdFilter">
			<level>Error</level>
		</filter>
		<!--日志名称，如果没有File 属性，那么只会使用FileNamePattern的文件路径规则
			如果同时有<File>和<FileNamePattern>，那么当天日志是<File>，明天会自动把今天
			的日志改名为今天的日期。即，<File> 的日志都是当天的。-->
		<File>${logPath}/error.log</File>
		<!--滚动策略，按照时间滚动 TimeBasedRollingPolicy-->
		<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
			<!--文件路径,定义了日志的切分方式——把每一天的日志归档到一个文件中,以防止日志填满整个
				磁盘空间-->
			<FileNamePattern>${logPath}/error_%d{yyyy-MM-dd}.log</FileNamePattern>
			<!--只保留最近90天的日志-->
			<maxHistory>90</maxHistory>
			<!--用来指定日志文件的上限大小，那么到了这个值，就会删除旧的日志-->
			<!--<totalSizeCap>1GB</totalSizeCap>-->
		</rollingPolicy>
		<!--日志输出编码格式化-->
		<encoder>
			<charset>UTF-8</charset>
			<pattern>${PATTERN}</pattern>
		</encoder>
	</appender>
  
	<!--指定最基础的日志输出级别-->
	<root level="DEBUG">
		<!--appender将会添加到这个loger-->
		<appender-ref ref="consoleLog"/>
		<appender-ref ref="fileDEBUGLog"/>
		<appender-ref ref="fileErrorLog"/>
	</root>
  
	<!-- 定义指定package的日志级别-->
	<logger name="org.springframework" level="DEBUG"></logger>
	<logger name="org.mybatis" level="DEBUG"></logger>
	<logger name="java.sql.Connection" level="DEBUG"></logger>
	<logger name="java.sql.Statement" level="DEBUG"></logger>
	<logger name="java.sql.PreparedStatement" level="DEBUG"></logger>
	<logger name="io.lettuce.*" level="INFO"></logger>
	<logger name="io.netty.*" level="ERROR"></logger>
	<logger name="com.rabbitmq.*" level="DEBUG"></logger>
	<logger name="org.springframework.amqp.*" level="DEBUG"></logger>
	<logger name="org.springframework.scheduling.*" level="DEBUG"></logger>
	<!--定义com.xxx..xx..xx包下的日志信息不上传，直接输出到fileDEBUGLog和fileErrorLog这个两个appender
		中，日志级别为DEBUG-->
	<logger name="com.xxx.xxx.xx" additivity="false" level="DEBUG">
		<appender-ref ref="fileDEBUGLog"/>
		<appender-ref ref="fileErrorLog"/>
	</logger>
</configuration>
~~~

配置解释

>  **configuration节点**  这是一个根节点，其中的各个属性如下： 
>
> **1. scan** ：当此属性设置为true时，配置文件如果发生改变，将会被重新加载，默认值为true。 
>
> **2. scanPeriod** ：设置监测配置文件是否有修改的时间间隔，如果没有给出时间单位，默认单位是毫 秒。当scan为true时，此属性生效。默认的时间间隔为1分钟。 
>
> **3. debug** ：当此属性设置为true时，将打印出logback内部日志信息，实时查看logback运行状态。 默认值为false。  
>
>  **root节点**  
>
> 这是一个必须节点，用来指定基础的日志级别，只有一个 level 属性，默认值是 DEBUG 。 该节点可以包含零个或者多个元素，子节点是 appender-ref ，标记这个 appender 将会添加到这个logger 中。  	
>
> **contextName节点** 
>
> 标识一个上下文名称，默认为default，一般用不到  
>
> **property节点** 
>
> 标记一个上下文变量，属性有name和value，定义变量之后可以使用 ${} 来获取。  
>
> **appender节点**
>
> 用来格式化日志输出节点，有两个属性 name 和 class ，class用来指定哪种输出策略，常用就是**控制台输出策略**和**文件输出策略**。
> 	这个节点很重要，通常的日志文件需要定义三个appender，分别是控制台输出，常规日志文件输出，异
> 常日志文件输出。
> 该节点有几个重要的子节点，如下：
>
> 1. **filter** ：日志输出拦截器，没有特殊定制一般使用系统自带的即可，但是如果要将日志分开，比
>    如将ERROR级别的日志输出到一个文件中，将除了 ERROR 级别的日志输出到另外一个文件中，此
>    时就要拦截 ERROR 级别的日志了。
> 2. **encoder** ： 和pattern节点组合用于具体输出的日志格式和编码方式。
> 3. **file** : 节点用来指明日志文件的输出位置，可以是绝对路径也可以是相对路径
> 4. **rollingPolicy** : 日志回滚策略，在这里我们用了TimeBasedRollingPolicy，基于时间的回滚策略,
>    有以下子节点fileNamePattern，必要节点，可以用来设置指定时间的日志归档。
> 5. **maxHistory** : 可选节点，控制保留的归档文件的最大数量，超出数量就删除旧文件,，例如设置为
>    30的话，则30天之后，旧的日志就会被删除
> 6. **totalSizeCap** : 可选节点，用来指定日志文件的上限大小，例如设置为3GB的话，那么到了这个
>    值，就会删除旧的日志
>
> **logger节点**
> 	可选节点，用来具体指明包的日志输出级别，它将会覆盖root的输出级别。
> 该节点有几个重要的属性如下：
>
> 1. **name** ：指定的包名
> 2. **level** ：可选，日志的级别
> 3. **addtivity** ：可选，默认为true，将此logger的信息向上级传递，将有root节点定义日志打印。
>    如果设置为false，将不会上传，此时需要定义一个 appender-ref 节点才会输出。