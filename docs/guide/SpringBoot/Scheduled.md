---
title: 定时任务
---
# 目录

[[toc]]

## 定时任务

`SpringBoot`定时任务可以直接使用`SpringBoot`自带的`Scheduled`来实现，简单方便快捷

## 定时任务配置详解

`cron`表达式详解

`cron`表达式是一个字符串，由6或7个表达式组成，每个表达式中间有个空格，每个表达式代表一个含义，`cron`有两种语法格式

- `Seconds`（秒） `Minutes`（分） `Hours`（时） `DayofMonth`（月份中的日期） `Month`（月） `DayofWeek`（星期中的日期） `Year`（年）
- `Seconds`（秒） `Minutes`（分） `Hours`（时） `DayofMonth`（月份中的日期） `Month`（月） `DayofWeek`（星期中的日期）

| 位置 |          表达式名称          |                允许值                 |  允许的特殊字符   |
| :--: | :--------------------------: | :-----------------------------------: | :---------------: |
|  1   |       `Seconds`（秒）        |              0-59的整数               |     `, - * /`     |
|  2   |       `Minutes`（分）        |              0-59的整数               |     `, - * /`     |
|  3   |        `Hours`（时）         |              0-23的整数               |     `, - * /`     |
|  4   | `DayofMonth`（月份中的日期） |              1-31的整数               | `, - * / ? L W C` |
|  5   |        `Month`（月）         |          1-12的整数或JAN-DEc          |     `, - * /`     |
|  6   | `DayofWeek`（星期中的日期）  | 1-7的整数（1表示星期天，2表示星期一） | `, - * / ? L C #` |
|  7   |     `Year`（年）（可选）     |              1970-2099年              |     `, - * /`     |

- `*`：表示对应时间表达式的每一个时刻， 例如， 在秒字段时， 表示“每秒”；
- `?`：表明不想设置的那个字段。 例如想在每月的10日触发任务调度，不管10日到底是星期几，则只能使用如下写法： `0 0 0 10 * ?`, 其中最后一位只能用`？`，而不能使用`*`，如果使用`*`表示不管星期几都会触发， 与在每月10号触发矛盾了。
- `-`：表达一个范围，例如在`Hours`表达式使用`8-12`，表示从8点到12点每小时触发一次任务
- `,`：表达一个列表值， 如在星期字段中使用“`2,3,6`”， 则表示星期一， 星期二和星期五；
- `/`：`x/y` 表达一个等步长序列， `x` 为起始值， `y` 为增量步长值。 如在秒字段中使用 `0/15`， 则表示为 0,15,30 和 45 秒，都要执行调度任务。 而`5/15` 在分钟字段使用则表示在5,20,35,50分钟的时候都要执行调度任务。你也可以使用`/y`， 它等同于 `0/y`；
- `L`：表示最后，只能出现在`DayofWeek`和`DayofMonth`表达式，如果在`DayofWeek`表达式使用`2L`,表示在最后的一个星期一触发调度任务；
- `W`：表示有效工作日(周一到周五),只能出现在`DayofMonth`表达式，系统将在离指定日期的最近的有效工作日触发事件。例如：在 `DayofMonth`使用`10W`，如果10号是星期六，则将在最近的工作日：星期五，即14号触发。 如果15号是星期天，则在16号(周一)触发；如果15号在星期一到星期五中的一天，则就在15号当天触发。但必须注意匹配日期不能够跨月， 如你指定`1W`， 如果1号是星期六， 正确匹配的是 3 号星期一， 而不是上个月最后的那天（星期五）。 `W` 字符串只能指定单一日期， 而不能指定日期范围；
- `LW`:在`DayofMonth`表达式可以组合使用 `LW`， 它的意思是当月的最后一个工作日
- \`#`:用于确定每个月第几个星期几，只能出现在`DayofMonth`表达式。例如在`2#3`，表示某月的第三个星期一。
- `C`： 该字符只在`DayofWeek`和`DayofMonth`表达式中使用， 代表“`Calendar`”的意思。 它的意思是计划所关联的日期，如果日期没有被关联， 则相当于日历中所有日期。 例如 `5C` 在`DayofMonth`字段中就相当于日历 5 日以后的第一天。`1C` 在`DayofWeek`字段中相当于星期日后的第一天

### 示例

~~~java
// 每隔5秒钟执行一次任务
@Scheduled(cron="0/5 * * * * ?") 
// 每隔1分钟执行一次任务
@Scheduled(cron="0 0/1 * * * ?") 
// 每天中午12点行一次任务
@Scheduled(cron="0 0 12 * * ?") 
// 每天上午10:25行一次任务
@Scheduled(cron="0 25 10 ? * *") 
// 每天上午10:25行一次任务
@Scheduled(cron="0 25 10 * * ?") 
// 每天上午10:25行一次任务
@Scheduled(cron="0 25 10 * * ? *") 
// 2005年的每天上午10:15行一次任务
@Scheduled(cron="0 15 10 * * ? 2005") 
// 在每天下午6点到下午6:59期间的每1分钟行一次任务
@Scheduled(cron="0 * 18 * * ?") 
// 在每天下午6点到下午6:55期间的每5分钟行一次任务
@Scheduled(cron="0 0/5 18 * * ?") 
// 在每天下午2点到2:55期间和下午6点到6:55期间的每5分钟
@Scheduled(cron="0 0/5 14,18 * * ?") 
// 在每天下午6点到下午6:05期间的每1分钟行一次任务
@Scheduled(cron="0 0-5 18 * * ?") 
// 每天上午8点，10点，12点行一次任务
@Scheduled(cron="0 0 8,10,12 * * ?") 
// 朝九晚五工作时间内每半小时行一次任务
@Scheduled(cron="0 0/30 9-17 * * ?") 
// 表示每个星期一中午12点行一次任务
@Scheduled(cron="0 0 12 ? * 2") 
// 每年二月的星期二的下午2:10和2:50行一次任务
@Scheduled(cron="0 10,50 14 ? 2 3") 
// 周一至周五的上午10:20行一次任务
@Scheduled(cron="0 20 10 ? * 2-6") 
// 每月20日上午10:35行一次任务
@Scheduled(cron="0 35 10 20 * ?") 
// 每月最后一日的上午10:35行一次任务
@Scheduled(cron="0 35 10 L * ?") 
// 每月的最后一个星期五上午10:35行一次任务
@Scheduled(cron="0 35 10 ? * 6L") 
// 2020年至2025年的每月的最后一个星期五上午10:35
@Scheduled(cron="0 35 10 ? * 6L 2020-2025") 
// 每月的第二个星期五上午10:35行一次任务
@Scheduled(cron="0 35 10 ? * 6#2") 
~~~

## 线程池配置详解

~~~java
@Configuration
public class TaskConfig {
    //核心线程数，默认是1，为1的时候就是单线程
    private int corePoolSize = 5;
    //最大线程数，核心线程不够用的时候会创建新的线程，最大不超过maxPoolSize
    private int maxPoolSize = 20;
    //队列最大长度（容量）
    private int queueCapacity = 5;
    //非核心线程闲置时的超时时长，单位时秒
    private int keepAliveTime = 60;

    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        //设置核心线程数
        executor.setCorePoolSize(corePoolSize);
        //设置最大线程数
        executor.setMaxPoolSize(maxPoolSize);
        //设置队列最大长度（容量）
        executor.setQueueCapacity(queueCapacity);
        //设置闲置时的超时时长
        executor.setKeepAliveSeconds(keepAliveTime);
        //允许核心线程超时，默认时false，当设置为true后，核心线程超时也会销毁
        executor.setAllowCoreThreadTimeOut(true);
        // 线程池对拒绝任务（无线程可用）的处理策略，目前有4种方式，分别如下
        // AbortPolicy 丢弃任务，抛运行时异常，CallerRunsPolicy 执行任务
        // DiscardPolicy 忽视，什么都不会发生，DiscardOldestPolicy 从队列中踢出最先进入队列（最后一个执行）的任务
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        //等待所有线程执行完关闭线程池，默认为false
        executor.setWaitForTasksToCompleteOnShutdown(true);
        //设置等待关闭线程池的时间，因为不能无限的等待下去
        executor.setAwaitTerminationSeconds(60);
        //设置线程名字的前缀
        executor.setThreadNamePrefix("test-task-");
        executor.initialize();
        return executor;
    }
}
~~~

1. `corePoolSize`：核心线程数。

- 核心线程会一直存活，及时没有任务需要执行
- 当线程数小于核心线程数时，即使有线程空闲，线程池也会优先创建新线程处理
- 设置`allowCoreThreadTimeout`=`true`（默认false）时，核心线程会超时关闭

2. `maxPoolSize`：最大线程数。

- 当线程数`>=``corePoolSize`，且任务队列已满时。线程池会创建新线程来处理任务
- 当线程数`=``maxPoolSize`，且任务队列已满时，线程池会拒绝处理任务而抛出异常或根据 `RejectedExecutionHandler` 来进行拒绝策略处理。

3. `queueCapacity`：任务队列容量（阻塞队列） +当核心线程数达到最大时，新任务会放在队列中排队等待执行

4. `keepAliveTime`：线程空闲时间

- 当线程空闲时间达到`keepAliveTime`时，线程会退出，直到线程数量`=``corePoolSize`
- 如果`allowCoreThreadTimeout`=`true`，则会直到线程数量`=0`

5. `allowCoreThreadTimeout`：允许核心线程超时

6. `rejectedExecutionHandler`：任务拒绝处理器

- 两种情况会拒绝处理任务：
  - 当线程数已经达到`maxPoolSize`，切队列已满，会拒绝新任务
  - 当线程池被调用`shutdown()`后，会等待线程池里的任务执行完毕，再`shutdown`。如果在调用`shutdown()`和线程池真正`shutdown`之间提交任务，会拒绝新任务
- 线程池会调用`rejectedExecutionHandler`来处理这个任务。如果没有设置默认是`AbortPolicy`，会抛出异常
- `ThreadPoolExecutor`类有几个内部实现类来处理这类情况：
  - `AbortPolicy` 丢弃任务，抛运行时异常
  - `CallerRunsPolicy` 执行任务
  - `DiscardPolicy` 忽视，什么都不会发生
  - `DiscardOldestPolicy` 从队列中踢出最先进入队列（最后一个执行）的任务
- 实现`RejectedExecutionHandler`接口，可自定义处理器

### 默认值

- `corePoolSize`=`1`
- `queueCapacity`=`Integer.MAX_VALUE`
- `maxPoolSize`=`Integer.MAX_VALUE`
- `keepAliveTime`=`60s`
- `allowCoreThreadTimeout`=`false`
- `rejectedExecutionHandler`=`AbortPolicy()`

## 单线程示例

1. 先创建一个`springboot`工程，然后创建一个`task`的包，在包下创建`ScheduleTaskTest`类，类里面内容如下：

~~~java
@Component
@Slf4j
public class ScheduleTaskTest {
    // 每隔5秒钟执行一次任务
    @Scheduled(cron="0/5 * * * * ?")
    private void task1(){
        Thread current = Thread.currentThread();
        log.info("定时任务1:  taskId="+current.getId()+ ",name="+current.getName());
    }
    // 每隔3秒钟执行一次任务
    @Scheduled(cron="0/3 * * * * ?")
    private void task2(){
        Thread current = Thread.currentThread();
        log.info("定时任务2:  taskId="+current.getId()+ ",name="+current.getName());
    }
}
~~~

- `@Scheduled` 注解用于标注这个方法是一个定时任务的方法

2. 然后在启动类上面加上`@EnableScheduling`注解， 作用是发现组件里面带`@Scheduled`注解的任务并在后台执行该任务。并扫描定时任务所在包

~~~java
@SpringBootApplication((scanBasePackages = "com.zhang.task" ))
@EnableScheduling //开启定时任务
public class Springboot2Test02Application {
    public static void main(String[] args) {
        SpringApplication.run(TestApplication.class, args);
    }
}
~~~

3. 启动项目，看到控制台会有如下信息，表明控制台里面已经定时执行我们的任务了

~~~
定时任务2:  taskId=23,name=scheduling-1
定时任务1:  taskId=23,name=scheduling-1
定时任务2:  taskId=23,name=scheduling-1
定时任务2:  taskId=23,name=scheduling-1
定时任务1:  taskId=23,name=scheduling-1
定时任务2:  taskId=23,name=scheduling-1
~~~

::: tip

两个任务的`id`和`name`都是相同的，也就是说我们只有一个线程来执行任务。

`springboot`默认就是单线程

:::

## 多线程示例

1. 创建一个任务配置类`TaskConfig`，内容如下：

~~~java
@Configuration
public class TaskConfig {
    //核心线程数，默认是1，为1的时候就是单线程
    private int corePoolSize = 5;
    //最大线程数，核心线程不够用的时候会创建新的线程
    private int maxPoolSize = 20;
    //队列最大长度（容量）
    private int queueCapacity = 5;

    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(corePoolSize);
        executor.setMaxPoolSize(maxPoolSize);
        executor.setQueueCapacity(queueCapacity);
        executor.initialize();
        return executor;
    }
}
~~~

2. 创建`AsyncTaskTest`用来测试多线程任务

~~~java
@Component
@Slf4j
public class AsyncTaskTest {
    // 每隔5秒钟执行一次任务
    @Async
    @Scheduled(cron="0/5 * * * * ?")
    public void task3(){
        Thread current = Thread.currentThread();
        log.info("定时任务3:  taskId="+current.getId()+ ",name="+current.getName());
    }
    // 每隔3秒钟执行一次任务
    @Async
    @Scheduled(cron="0/3 * * * * ?")
    public void task4(){
        Thread current = Thread.currentThread();
        log.info("定时任务4:  taskId="+current.getId()+ ",name="+current.getName());
    }
}
~~~

3. 在启动类上加`@EnableAsync`表示开启多线程，也就是异步任务

~~~java
@SpringBootApplication(scanBasePackages = "com.ezhang.task" )
@EnableScheduling //开启定时任务
@EnableAsync //开启多线程
public class Springboot2Test02Application {
    public static void main(String[] args) {
        SpringApplication.run(TestApplication.class, args);
    }
}
~~~

::: tip

不要忘了添加`@EnableScheduling`和配置包扫描

:::

4. 启动项目，可以在控制台看到如下信息，表明任务有5个线程在执行，也就是我们在`TaskConfig`里面配置的`corePoolSize = 5`

~~~
定时任务3:  taskId=46,name=taskExecutor-2
定时任务4:  taskId=47,name=taskExecutor-3
定时任务4:  taskId=48,name=taskExecutor-4
定时任务3:  taskId=49,name=taskExecutor-5
定时任务4:  taskId=45,name=taskExecutor-1
定时任务4:  taskId=46,name=taskExecutor-2
定时任务3:  taskId=47,name=taskExecutor-3
~~~

## 配置多个线程池

因为有些定时任务是比较重要，有些则是不太重要，我们可以把定时任务分别放到不同的线程池中。

1. 我们创建一个任务配置类`TaskConfig`，内容如下：

~~~java
@Configuration
public class TaskConfig {
    //核心线程数，默认是1，为1的时候就是单线程
    private int corePoolSize = 5;
    //最大线程数，核心线程不够用的时候会创建新的线程
    private int maxPoolSize = 20;
    //队列最大长度（容量）
    private int queueCapacity = 5;
	
    //线程池1
    @Bean
    public Executor taskExecutor1() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(corePoolSize);
        executor.setMaxPoolSize(maxPoolSize);
        executor.setQueueCapacity(queueCapacity);
        executor.initialize();
        return executor;
    }
	
    //线程池2
    @Bean
    public Executor taskExecutor2() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(corePoolSize);
        executor.setMaxPoolSize(maxPoolSize);
        executor.setQueueCapacity(queueCapacity);
        executor.initialize();
        return executor;
    }
}
~~~

2. 创建一个测试类`AsyncTaskTest`用来测试不同任务使用不同线程池

在任务的`@Async`注解里面添加线程池的名字，表示该任务在哪个线程池里面

~~~java
@Component
@Slf4j
public class AsyncTaskTest {
    // 每隔5秒钟执行一次任务
    @Async("taskExecutor1")
    @Scheduled(cron="0/5 * * * * ?")
    public void task5(){
        Thread current = Thread.currentThread();
        log.info("定时任务3:  taskId="+current.getId()+ ",name="+current.getName());
    }
    // 每隔3秒钟执行一次任务
    @Async("taskExecutor2")
    @Scheduled(cron="0/3 * * * * ?")
    public void task6(){
        Thread current = Thread.currentThread();
        log.info("定时任务4:  taskId="+current.getId()+ ",name="+current.getName());
    }
}
~~~

3. 启动项目后，在控制台可以看到，两个任务分别在各自的线程池内执行。

~~~
定时任务3:  taskId=45,name=taskExecutor1-1
定时任务4:  taskId=46,name=taskExecutor2-1
定时任务4:  taskId=47,name=taskExecutor2-2
定时任务3:  taskId=48,name=taskExecutor1-2
定时任务4:  taskId=49,name=taskExecutor2-3
定时任务4:  taskId=50,name=taskExecutor2-4
定时任务3:  taskId=51,name=taskExecutor1-3
定时任务4:  taskId=52,name=taskExecutor2-5
~~~

