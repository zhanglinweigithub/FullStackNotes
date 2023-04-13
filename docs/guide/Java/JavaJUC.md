---
title: Java并发
sidebar: 'auto'
---
# Java并发

## 一、创建线程

有三种创建线程的方法：

- 实现 `Runnable` 接口
- 实现 `Callable` 接口
- 继承 `Thread` 类

实现 `Runnable` 和 `Callable` 接口的类只能当做一个可以在线程中运行的任务，不是真正意义上的线程，因此最后还需要通过 `Thread` 来调用。

::: tip

任务是通过线程驱动从而执行的。

:::

### Thread

同样也是需要实现 `run()` 方法，因为 `Thread` 类也实现了 `Runable` 接口。

当调用 `start()` 方法启动一个线程时，虚拟机会将该线程放入就绪队列中等待被调度，当一个线程被调度时会执行该线程的 `run()` 方法

```java
public class MyThread extends Thread {
    public void run() {
        // 要执行的任务
    }
}
public static void main(String[] args) {
    MyThread mt = new MyThread();
    mt.start();
}
```

### Runnable

需要实现接口中的 `run()` 方法。

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        // 要执行的任务
    }
}
```

使用 `Runnable` 实例再创建一个 `Thread` 实例，然后调用 `Thread` 实例的 `start()` 方法来启动线程。

```java
public static void main(String[] args) {
    MyRunnable instance = new MyRunnable();
    Thread thread = new Thread(instance);
    thread.start();
}
```

### Callable

与 `Runnable` 相比，`Callable` 可以有返回值，返回值通过 `FutureTask` 进行封装

```java
public class MyCallable implements Callable<Integer> {
    public Integer call() {
        return 123;
    }
}
public static void main(String[] args) throws ExecutionException, InterruptedException {
    MyCallable mc = new MyCallable();
    FutureTask<Integer> ft = new FutureTask<>(mc);
    Thread thread = new Thread(ft);
    thread.start();
    // 通过 get 方法获取执行结果
    System.out.println(ft.get());
}
```

### 实现接口 VS 继承 Thread

实现接口会更好一些，因为：

- `Java` 不支持多重继承，因此继承了 `Thread` 类就无法继承其它类，但是可以实现多个接口；
- 类可能只要求可执行就行，继承整个 `Thread` 类开销过大。

## 二、线程状态

线程一共有六种状态

![image-20230413123045610](./img/image-20230413123045610.png)

一个线程只能处于一种状态，并且这里的线程状态特指 Java 虚拟机的线程状态，不能反映线程在特定操作系统下的状态。

### 新建（NEW）

创建后尚未启动

### 可运行（RUNNABLE）

线程已经调用了`start()`，等待CPU调度

### 阻塞（BLOCKED）

线程在执行的时候未竞争到锁对象，则该线程进入阻塞状态

### 无限期等待（WAITING）

等待其它线程调用`notify()`或`notifyAll()`显式地唤醒。

阻塞和等待的区别在于，阻塞是被动的，它是在等待获取 `monitor lock`。

而等待是主动的，通过调用 `Object.wait()` 等方法进入。

| 进入方法                                   | 退出方法                             |
| ------------------------------------------ | ------------------------------------ |
| 没有设置 Timeout 参数的 Object.wait() 方法 | Object.notify() / Object.notifyAll() |
| 没有设置 Timeout 参数的 Thread.join() 方法 | 被调用的线程执行完毕                 |
| LockSupport.park() 方法                    | LockSupport.unpark(Thread)           |

### 限期等待（TIMED WAITING）

无需等待其它线程显式地唤醒，在一定时间之后会被系统自动唤醒。

| 进入方法                                 | 退出方法                                        |
| ---------------------------------------- | ----------------------------------------------- |
| Thread.sleep() 方法                      | 时间结束                                        |
| 设置了 Timeout 参数的 Object.wait() 方法 | 时间结束 / Object.notify() / Object.notifyAll() |
| 设置了 Timeout 参数的 Thread.join() 方法 | 时间结束 / 被调用的线程执行完毕                 |
| LockSupport.parkNanos() 方法             | LockSupport.unpark(Thread)                      |
| LockSupport.parkUntil() 方法             | LockSupport.unpark(Thread)                      |

调用 `Thread.sleep()` 方法使线程进入限期等待状态时，常常用“使一个线程睡眠”进行描述。

调用 `Object.wait()` 方法使线程进入限期等待或者无限期等待时，常常用“挂起一个线程”进行描述。

::: tip

睡眠和挂起是用来描述行为，而阻塞和等待用来描述状态。

:::

### 死亡（TERMINATED）

可以是线程结束任务之后自己结束，或者产生了异常而结束。

## 三、线程间通信

当多个线程可以一起工作去解决某个问题时，如果某些部分必须在其它部分之前完成，那么就需要对线程进行协调。

### join()

在线程中调用另一个线程的 `join()` 方法，会将当前线程挂起，而不是忙等待，直到目标线程结束。

对于以下代码，虽然 b 线程先启动，但是因为在 b 线程中调用了 a 线程的 `join()` 方法，b 线程会等待 a 线程结束才继续执行，因此最后能够保证 a 线程的输出先于 b 线程的输出。

```java
public class JoinExample {

    private class A extends Thread {
        @Override
        public void run() {
            System.out.println("A");
        }
    }

    private class B extends Thread {

        private A a;

        B(A a) {
            this.a = a;
        }

        @Override
        public void run() {
            try {
                a.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("B");
        }
    }

    public void test() {
        A a = new A();
        B b = new B(a);
        b.start();
        a.start();
    }
}
public static void main(String[] args) {
    JoinExample example = new JoinExample();
    example.test();
}

// 输出
A
B
```

### wait() notify() notifyAll()

调用 `wait()` 使得线程等待某个条件满足，线程在等待时会被挂起，当其他线程的运行使得这个条件满足时，其它线程会调用 `notify()` 或者 `notifyAll()` 来唤醒挂起的线程。

它们都属于 `Object` 的一部分，而不属于 `Thread`。

只能用在同步方法或者同步控制块中使用，否则会在运行时抛出 `IllegalMonitorStateException`。

使用 `wait()` 挂起期间，线程会释放锁。这是因为，如果没有释放锁，那么其它线程就无法进入对象的同步方法或者同步控制块中，那么就无法执行 `notify()` 或者 `notifyAll()` 来唤醒挂起的线程，造成死锁。

```java
public class WaitNotifyExample {

    public synchronized void before() {
        System.out.println("before");
        notifyAll();
    }

    public synchronized void after() {
        try {
            wait();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("after");
    }
}
public static void main(String[] args) {
    ExecutorService executorService = Executors.newCachedThreadPool();
    WaitNotifyExample example = new WaitNotifyExample();
    executorService.execute(() -> example.after());
    executorService.execute(() -> example.before());
}

// 输出
before
after
```

**wait() 和 sleep() 的区别**

- `wait()` 是 `Object` 的方法，而 `sleep()` 是 `Thread` 的静态方法；
- `wait()` 会释放锁，`sleep()` 不会。

### await() signal() signalAll()

`java.util.concurrent` 类库中提供了 `Condition` 类来实现线程之间的协调，可以在 `Condition` 上调用 `await()` 方法使线程等待，其它线程调用 `signal()` 或 `signalAll()` 方法唤醒等待的线程。

相比于 `wait()` 这种等待方式，`await()` 可以指定等待的条件，因此更加灵活。

使用 `Lock` 来获取一个 `Condition` 对象。

```java
public class AwaitSignalExample {

    private Lock lock = new ReentrantLock();
    private Condition condition = lock.newCondition();

    public void before() {
        lock.lock();
        try {
            System.out.println("before");
            condition.signalAll();
        } finally {
            lock.unlock();
        }
    }

    public void after() {
        lock.lock();
        try {
            condition.await();
            System.out.println("after");
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }
}
public static void main(String[] args) {
    ExecutorService executorService = Executors.newCachedThreadPool();
    AwaitSignalExample example = new AwaitSignalExample();
    executorService.execute(() -> example.after());
    executorService.execute(() -> example.before());
}

// 输出
before
after
```

## 四、线程池

使用线程池的好处：

- **降低资源消耗**。通过重复利用已创建的线程降低线程创建和销毁造成的消耗。
- **提高响应速度**。当任务到达时，任务可以不需要等到线程创建就能立即执行。
- **提高线程的可管理性**。线程是稀缺资源，如果无限制的创建，不仅会消耗系统资源，还会降低系统的稳定性，使用线程池可以进行统一的分配，调优和监控。

::: tip

线程池一般用于执行多个不相关联的耗时任务，没有多线程的情况下，任务顺序执行，使用了线程池的话可让多个不相关联的任务同时执行

:::

### 前置概念

**1、任务**

执行任务需要实现的 `Runnable` 接口 或 `Callable`接口。

`Runnable` 接口或 `Callable` 接口 实现类都可以被 `ThreadPoolExecutor` 或 `ScheduledThreadPoolExecutor` 执行。

**2、任务的执行**

![image-20230413124649357](./img/image-20230413124649357.png)

任务执行机制的核心接口 `Executor` ，以及继承自 `Executor` 接口的 `ExecutorService` 接口。

`ThreadPoolExecutor` 和 `ScheduledThreadPoolExecutor` 这两个关键类实现了 `ExecutorService` 接口

**3、异步计算结果**

异步计算结果的核心 `Future` 接口，以及`Future`接口的实现类`FutureTak`类

当我们把 `Runnable`接口 或 `Callable` 接口 的实现类提交给 `ThreadPoolExecutor` 或 `ScheduledThreadPoolExecutor` 执行。（调用 `submit()` 方法时会返回一个 `FutureTask` 对象）

![image-20230413124939902](./img/image-20230413124939902.png)

- 主线程首先要创建实现 `Runnable` 或者 `Callable` 接口的任务对象。
- 把创建完成的实现 `Runnable`/`Callable`接口的 对象直接交给 `ExecutorService` 执行: 
  - `ExecutorService.execute（Runnable command）`
  - 也可以把 `Runnable` 对象或`Callable` 对象提交给 `ExecutorService` 执行（`ExecutorService.submit（Runnable task）`
  - 或 `ExecutorService.submit（Callable <T> task）`。
- 如果执行 `ExecutorService.submit（…）`，`ExecutorService` 将返回一个实现`Future`接口的对象
  - 执行 `execute()`方法和 `submit()`方法的区别，`submit()`会返回一个 `FutureTask 对象`
  - `由于 FutureTask` 实现了 `Runnable`，我们也可以创建 `FutureTask`，然后直接交给 `ExecutorService` 执行。
- 最后，主线程可以执行 `FutureTask.get()`方法来等待任务执行完成。
  - 主线程也可以执行 `FutureTask.cancel（boolean mayInterruptIfRunning）`来取消此任务的执行。

### ThreadPoolExecutor

线程池实现类 `ThreadPoolExecutor` 是 `Executor` 框架最核心的类

#### 构造方法

`ThreadPoolExecutor` 类中提供的四个构造方法。

其余三个都是在这个构造方法的基础上给定某些参数的默认值，比如默认拒绝策略

~~~java
public ThreadPoolExecutor(int corePoolSize,							
                              int maximumPoolSize,					
                              long keepAliveTime,					
                              TimeUnit unit,						
                              BlockingQueue<Runnable> workQueue,	
                              ThreadFactory threadFactory,			
                              RejectedExecutionHandler handler		
                               ) {
        if (corePoolSize < 0 ||
            maximumPoolSize <= 0 ||
            maximumPoolSize < corePoolSize ||
            keepAliveTime < 0)
            throw new IllegalArgumentException();
        if (workQueue == null || threadFactory == null || handler == null)
            throw new NullPointerException();
        this.corePoolSize = corePoolSize;
        this.maximumPoolSize = maximumPoolSize;
        this.workQueue = workQueue;
        this.keepAliveTime = unit.toNanos(keepAliveTime);
        this.threadFactory = threadFactory;
        this.handler = handler;
    }
~~~

一共可接收7个参数

- `corePoolSize`：线程池的核心线程数量
- `maximumPoolSize`：线程池的最大线程数
- `keepAliveTime`：当线程数大于核心线程数时，多余的空闲线程存活的最长时间
- `unit`：时间单位
- `workQueue`：任务队列，用来储存等待执行任务的队列
- `threadFactory`：线程工厂，用来创建线程
- `handler`：拒绝策略，当提交的任务过多而不能及时处理时，拒绝策略是怎样的

::: tip

`corePoolSize`，`maximumPoolSize` ，`workQueue`，比较重要哦

:::

::: warning 注意

临时线程的创建时机：当所有核心线程都在忙，且任务队列满了，这时在有新的任务来才会创建临时线程去处理。

临时线程的销毁：当临时线程空闲时，经过设定的`keepAliveTime`时间后，才会销毁，而不是立即销毁。

入队时机：新任务来的时候会先判断当前运行的线程数量是否达到核心线程数，如果达到的话，新任务就会被存放在队列

:::

#### 拒绝策略

如果当前同时运行的线程数量达到最大线程数量并且队列也已经被放满了任务时，这时再来新任务所采取的策略

- `AbortPolicy` ：抛出 `RejectedExecutionException`来拒绝新任务的处理。（默认）
  - `ThreadPoolExecutor.AbortPolicy`
- `CallerRunsPolicy` ：调用执行自己的线程运行任务，也就是直接在调用`execute`方法的线程中运行(`run`)被拒绝的任务，如果执行程序已关闭，则会丢弃该任务。因此这种策略会降低对于新任务提交速度，影响程序的整体性能。如果您的应用程序可以承受此延迟并且你要求任何一个任务请求都要被执行的话，你可以选择这个策略。
  - `ThreadPoolExecutor.CallerRunsPolicy`
- `DiscardPolicy` ：不处理新任务，直接丢弃掉。
  - `ThreadPoolExecutor.DiscardPolicy`
- `DiscardOldestPolicy` ： 此策略将丢弃最早的未处理的任务请求
  - `ThreadPoolExecutor.DiscardOldestPolicy`

#### 阻塞队列

线程池常用阻塞队列

- `LinkedBlockingQueue`：无界队列；
  - 容量为 `Integer.MAX_VALUE`
- `SynchronousQueue`：同步队列；
  - 没有容量，不存储元素；
  - 如果有空闲线程，则使用空闲线程来处理，否则新建一个线程来处理任务
  - 线程数是可以无限扩展的，可能会创建大量线程，从而导致 OOM
- `DelayedWorkQueue`：延迟阻塞队列；
  - 内部采用的是“堆”的数据结构，按照延迟的时间长短对任务进行排序
  - 每次出队的任务都是当前队列中执行时间最靠前的
  - 元素满了之后会自动扩容原来容量的 `1/2`，即永远不会阻塞，最大扩容可达 `Integer.MAX_VALUE`

### 线程池的创建

#### 方式一

通过`ThreadPoolExecutor`构造函数来创建（推荐）

![image-20230413130922523](./img/image-20230413130922523.png)

#### 方式二

通过 `Executor` 框架的工具类 `Executors` 来创建

通过这种方式我们可以创建多种类型的 `ThreadPoolExecutor`：

- `FixedThreadPool` ： 该方法返回一个固定线程数量的线程池。该线程池中的线程数量始终不变。当有一个新的任务提交时，线程池中若有空闲线程，则立即执行。若没有，则新的任务会被暂存在一个任务队列中，待有线程空闲时，便处理在任务队列中的任务。
- `SingleThreadExecutor`： 该方法返回一个只有一个线程的线程池。若多余一个任务被提交到该线程池，任务会被保存在一个任务队列中，待线程空闲，按先入先出的顺序执行队列中的任务。
- `CachedThreadPool`： 该方法返回一个可根据实际情况调整线程数量的线程池。线程池的线程数量不确定，但若有空闲线程可以复用，则会优先使用可复用的线程。若所有线程均在工作，又有新的任务提交，则会创建新的线程处理任务。所有线程在当前任务执行完毕后，将返回线程池进行复用。
- `ScheduledThreadPool` ：该返回一个用来在给定的延迟后运行任务或者定期执行任务的线程池。

::: tip

**《阿里巴巴 Java 开发手册》** 强制线程池不允许使用 `Executors` 去创建，而是通过 `ThreadPoolExecutor` 构造函数的方式，这样的创建方式让开发者更加明确线程池的运行规则，规避资源耗尽的风险

:::

#### 使用Executors创建线程池的弊端

`FixedThreadPool` 和 `SingleThreadExecutor` ： 使用的是无界的 `LinkedBlockingQueue`，任务队列最大长度为 `Integer.MAX_VALUE`,可能堆积大量的请求，从而导致 OOM。

`CachedThreadPool` ：使用的是同步队列 `SynchronousQueue`, 允许创建的线程数量为 `Integer.MAX_VALUE` ，可能会创建大量线程，从而导致 OOM。

`ScheduledThreadPool` 和 `SingleThreadScheduledExecutor` : 使用的无界的延迟阻塞队列`DelayedWorkQueue`，任务队列最大长度为 `Integer.MAX_VALUE`,可能堆积大量的请求，从而导致 OOM。

~~~java
// 无界队列 LinkedBlockingQueue
public static ExecutorService newFixedThreadPool(int nThreads) {

    return new ThreadPoolExecutor(nThreads, nThreads,0L, TimeUnit.MILLISECONDS,new LinkedBlockingQueue<Runnable>());

}

// 无界队列 LinkedBlockingQueue
public static ExecutorService newSingleThreadExecutor() {

    return new FinalizableDelegatedExecutorService (new ThreadPoolExecutor(1, 1,0L, TimeUnit.MILLISECONDS,new LinkedBlockingQueue<Runnable>()));

}

// 同步队列 SynchronousQueue，没有容量，最大线程数是 Integer.MAX_VALUE`
public static ExecutorService newCachedThreadPool() {

    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,60L, TimeUnit.SECONDS,new SynchronousQueue<Runnable>());

}

// DelayedWorkQueue（延迟阻塞队列）
public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) {
    return new ScheduledThreadPoolExecutor(corePoolSize);
}
public ScheduledThreadPoolExecutor(int corePoolSize) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS,
          new DelayedWorkQueue());
}
~~~

### 方法对比

#### `execute()` 与 `submit()`

- `execute()`方法用于提交不需要返回值的任务，所以无法判断任务是否被线程池执行成功与否；
- `submit()`方法用于提交需要返回值的任务。线程池会返回一个 `Future` 类型的对象，通过这个 `Future` 对象可以判断任务是否执行成功，并且可以通过 `Future` 的 `get()`方法来获取返回值，`get()`方法会阻塞当前线程直到任务完成，而使用 `get（long timeout，TimeUnit unit）`方法的话，如果在 `timeout` 时间内任务还没有执行完，就会抛出 `java.util.concurrent.TimeoutException`

#### `shutdown()`VS`shutdownNow()`

- **`shutdown（）`** :关闭线程池，线程池的状态变为 `SHUTDOWN`。线程池不再接受新任务了，但是队列里的任务得执行完毕。
- **`shutdownNow（）`** :关闭线程池，线程的状态变为 `STOP`。线程池会终止当前正在运行的任务，并停止处理排队的任务并返回正在等待执行的 List。

#### `isTerminated()` VS `isShutdown()`

- **`isShutDown`** 当调用 `shutdown()` 方法后返回为 true。
- **`isTerminated`** 当调用 `shutdown()` 方法后，并且所有提交的任务完成后返回为 true



### 原理

![image-20230413132533568](./img/image-20230413132533568.png)

- 如果当前运行的线程数小于核心线程数，那么就会新建一个线程来执行任务。
- 如果当前运行的线程数等于或大于核心线程数，但是小于最大线程数，那么就把该任务放入到任务队列里等待执行。
- 如果向任务队列投放任务失败（任务队列已经满了），但是当前运行的线程数是小于最大线程数的，就新建一个线程来执行任务。
- 如果当前运行的线程数已经等同于最大线程数了，那么当前任务会被拒绝，饱和策略会调用`RejectedExecutionHandler.rejectedExecution()`方法。

`execute`方法

~~~java
  // 存放线程池的运行状态 (runState) 和线程池内有效线程的数量 (workerCount)
   private final AtomicInteger ctl = new AtomicInteger(ctlOf(RUNNING, 0));

    private static int workerCountOf(int c) {
        return c & CAPACITY;
    }
    //任务队列
    private final BlockingQueue<Runnable> workQueue;

    public void execute(Runnable command) {
        // 如果任务为null，则抛出异常。
        if (command == null)
            throw new NullPointerException();
        // ctl 中保存的线程池当前的一些状态信息
        int c = ctl.get();

        //  下面会涉及到 3 步 操作
        // 1.首先判断当前线程池中执行的任务数量是否小于 corePoolSize
        // 如果小于的话，通过addWorker(command, true)新建一个线程，并将任务(command)添加到该线程中；然后，启动该线程从而执行任务。
        if (workerCountOf(c) < corePoolSize) {
            if (addWorker(command, true))
                return;
            c = ctl.get();
        }
        // 2.如果当前执行的任务数量大于等于 corePoolSize 的时候就会走到这里，表明创建新的线程失败。
        // 通过 isRunning 方法判断线程池状态，线程池处于 RUNNING 状态并且队列可以加入任务，该任务才会被加入进去
        if (isRunning(c) && workQueue.offer(command)) {
            int recheck = ctl.get();
            // 再次获取线程池状态，如果线程池状态不是 RUNNING 状态就需要从任务队列中移除任务，并尝试判断线程是否全部执行完毕。同时执行拒绝策略。
            if (!isRunning(recheck) && remove(command))
                reject(command);
                // 如果当前工作线程数量为0，新创建一个线程并执行。
            else if (workerCountOf(recheck) == 0)
                addWorker(null, false);
        }
        //3. 通过addWorker(command, false)新建一个线程，并将任务(command)添加到该线程中；然后，启动该线程从而执行任务。
        // 传入 false 代表增加线程时判断当前线程数是否少于 maxPoolSize
        //如果addWorker(command, false)执行失败，则通过reject()执行相应的拒绝策略的内容。
        else if (!addWorker(command, false))
            reject(command);
    }
~~~

在 `execute` 方法中，多次调用 `addWorker` 方法。

`addWorker` 这个方法主要用来创建新的工作线程，如果返回 `true` 说明创建和启动工作线程成功，否则的话返回的就是 `false`

~~~java
// 全局锁，并发操作必备
    private final ReentrantLock mainLock = new ReentrantLock();
    // 跟踪线程池的最大大小，只有在持有全局锁mainLock的前提下才能访问此集合
    private int largestPoolSize;
    // 工作线程集合，存放线程池中所有的（活跃的）工作线程，只有在持有全局锁mainLock的前提下才能访问此集合
    private final HashSet<Worker> workers = new HashSet<>();
    //获取线程池状态
    private static int runStateOf(int c)     { return c & ~CAPACITY; }
    //判断线程池的状态是否为 Running
    private static boolean isRunning(int c) {
        return c < SHUTDOWN;
    }


    /**
     * 添加新的工作线程到线程池
     * @param firstTask 要执行
     * @param core参数为true的话表示使用线程池的基本大小，为false使用线程池最大大小
     * @return 添加成功就返回true否则返回false
     */
   private boolean addWorker(Runnable firstTask, boolean core) {
        retry:
        for (;;) {
            //这两句用来获取线程池的状态
            int c = ctl.get();
            int rs = runStateOf(c);

            // Check if queue empty only if necessary.
            if (rs >= SHUTDOWN &&
                ! (rs == SHUTDOWN &&
                   firstTask == null &&
                   ! workQueue.isEmpty()))
                return false;

            for (;;) {
               //获取线程池中工作的线程的数量
                int wc = workerCountOf(c);
                // core参数为false的话表明队列也满了，线程池大小变为 maximumPoolSize
                if (wc >= CAPACITY ||
                    wc >= (core ? corePoolSize : maximumPoolSize))
                    return false;
               //原子操作将workcount的数量加1
                if (compareAndIncrementWorkerCount(c))
                    break retry;
                // 如果线程的状态改变了就再次执行上述操作
                c = ctl.get();
                if (runStateOf(c) != rs)
                    continue retry;
                // else CAS failed due to workerCount change; retry inner loop
            }
        }
        // 标记工作线程是否启动成功
        boolean workerStarted = false;
        // 标记工作线程是否创建成功
        boolean workerAdded = false;
        Worker w = null;
        try {

            w = new Worker(firstTask);
            final Thread t = w.thread;
            if (t != null) {
              // 加锁
                final ReentrantLock mainLock = this.mainLock;
                mainLock.lock();
                try {
                   //获取线程池状态
                    int rs = runStateOf(ctl.get());
                   //rs < SHUTDOWN 如果线程池状态依然为RUNNING,并且线程的状态是存活的话，就会将工作线程添加到工作线程集合中
                  //(rs=SHUTDOWN && firstTask == null)如果线程池状态小于STOP，也就是RUNNING或者SHUTDOWN状态下，同时传入的任务实例firstTask为null，则需要添加到工作线程集合和启动新的Worker
                   // firstTask == null证明只新建线程而不执行任务
                    if (rs < SHUTDOWN ||
                        (rs == SHUTDOWN && firstTask == null)) {
                        if (t.isAlive()) // precheck that t is startable
                            throw new IllegalThreadStateException();
                        workers.add(w);
                       //更新当前工作线程的最大容量
                        int s = workers.size();
                        if (s > largestPoolSize)
                            largestPoolSize = s;
                      // 工作线程是否启动成功
                        workerAdded = true;
                    }
                } finally {
                    // 释放锁
                    mainLock.unlock();
                }
                //// 如果成功添加工作线程，则调用Worker内部的线程实例t的Thread#start()方法启动真实的线程实例
                if (workerAdded) {
                    t.start();
                  /// 标记线程启动成功
                    workerStarted = true;
                }
            }
        } finally {
           // 线程启动失败，需要从工作线程中移除对应的Worker
            if (! workerStarted)
                addWorkerFailed(w);
        }
        return workerStarted;
    }
~~~

文章推荐：[4W 字从源码上分析 JUC 线程池 ThreadPoolExecutor 的实现原理](https://www.throwx.cn/2020/08/23/java-concurrency-thread-pool-executor/)

## 五、线程池最佳实践

### 1、使用`ThreadPoolExecutor` 创建线程池

### 2、监控线程池运行状态

- `ThreadPoolExecutor`提供了获取线程池当前的线程数和活跃线程数、已经执行完成的任务数、正在排队中的任务数等`API`

- ![image-20230413133630780](./img/image-20230413133630780.png)

- ~~~java
  /**
   * 打印线程池的状态
   *
   * @param threadPool 线程池对象
   */
  public static void printThreadPoolStatus(ThreadPoolExecutor threadPool) {
      ScheduledExecutorService scheduledExecutorService = new ScheduledThreadPoolExecutor(1, createThreadFactory("print-images/thread-pool-status", false));
      scheduledExecutorService.scheduleAtFixedRate(() -> {
          log.info("=========================");
          log.info("ThreadPool Size: [{}]", threadPool.getPoolSize());
          log.info("Active Threads: {}", threadPool.getActiveCount());
          log.info("Number of Tasks : {}", threadPool.getCompletedTaskCount());
          log.info("Number of Tasks in Queue: {}", threadPool.getQueue().size());
          log.info("=========================");
      }, 0, 1, TimeUnit.SECONDS);
  }
  ~~~

### 3、给线程起个有意义的名字，这样可以方便找 Bug

- 利用 `guava` 的 `ThreadFactoryBuilder`

  - ~~~java
    ThreadFactory threadFactory = new ThreadFactoryBuilder()
                            .setNameFormat(threadNamePrefix + "-%d")
                            .setDaemon(true).build();
    ExecutorService threadPool = new ThreadPoolExecutor(corePoolSize, maximumPoolSize, keepAliveTime, TimeUnit.MINUTES, workQueue, threadFactory)
    ~~~

- 实现 `ThreadFactor`

  - ~~~java
    /**
     * 线程工厂，它设置线程名称，有利于我们定位问题。
     */
    public final class NamingThreadFactory implements ThreadFactory {
    
        private final AtomicInteger threadNum = new AtomicInteger();
        private final ThreadFactory delegate;
        private final String name;
    
        /**
         * 创建一个带名字的线程池生产工厂
         */
        public NamingThreadFactory(ThreadFactory delegate, String name) {
            this.delegate = delegate;
            this.name = name; // TODO consider uniquifying this
        }
    
        @Override
        public Thread newThread(Runnable r) {
            Thread t = delegate.newThread(r);
            t.setName(name + " [#" + threadNum.incrementAndGet() + "]");
            return t;
        }
    
    }
    ~~~

### 4、正确配置线程池参数

如果我们设置的线程池数量太小的话，如果同一时间有大量任务/请求需要处理，可能会导致大量的请求/任务在任务队列中排队等待执行，甚至会出现任务队列满了之后任务/请求无法处理的情况，或者大量任务堆积在任务队列导致 OOM。这样很明显是有问题的，CPU 根本没有得到充分利用。

如果我们设置线程数量太大，大量线程可能会同时在争取 CPU 资源，这样会导致大量的上下文切换，从而增加线程的执行时间，影响了整体执行效率。

#### 参考公式

**CPU 密集型任务(N+1)：** 这种任务消耗的主要是 CPU 资源，可以将线程数设置为 N（CPU 核心数）+1。比 CPU 核心数多出来的一个线程是为了防止线程偶发的缺页中断，或者其它原因导致的任务暂停而带来的影响。一旦任务暂停，CPU 就会处于空闲状态，而在这种情况下多出来的一个线程就可以充分利用 CPU 的空闲时间。

**I/O 密集型任务(2N)：** 这种任务应用起来，系统会用大部分的时间来处理 `I/O` 交互，而线程在处理 `I/O` 的时间段内不会占用 CPU 来处理，这时就可以将 CPU 交出给其它线程使用。因此在 `I/O` 密集型任务的应用中，我们可以多配置一些线程，具体的计算方法是 2N。

#### 判断是 CPU 密集任务还是 IO 密集任务

CPU 密集型简单理解就是利用 CPU 计算能力的任务比如你在内存中对大量数据进行排序。

但凡涉及到网络读取，文件读取这类都是 IO 密集型，这类任务的特点是 CPU 计算耗费时间相比于等待 IO 操作完成的时间来说很少，大部分时间都花在了等待 IO 操作完成上
