import{_ as n,c as e,d as a,o as i}from"./app-uBpxEUoB.js";const l={};function r(c,s){return i(),e("div",null,s[0]||(s[0]=[a(`<p>Spring AOP（面向切面编程）允许开发者定义横切关注点，如日志记录、事务管理等，并将这些逻辑应用于业务代码中而无需修改原有的业务逻辑。Spring AOP可以使用JDK动态代理和CGLIB来实现AOP的功能。</p><h2 id="jdk-proxy" tabindex="-1"><a class="header-anchor" href="#jdk-proxy"><span>JDK Proxy</span></a></h2><p>JDK Proxy是Java自带的代理机制，它要求被代理的类必须实现一个或多个接口。JDK Proxy通过在运行时创建实现相同接口的<strong>新类</strong>来生成代理对象。 <strong>例子：</strong> 假设我们有一个简单的<code>UserService</code>接口及其实现：</p><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java"><pre><code><span class="line">public interface UserService {</span>
<span class="line">    void saveUser();</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">public class UserServiceImpl implements UserService {</span>
<span class="line">    @Override</span>
<span class="line">    public void saveUser() {</span>
<span class="line">        System.out.println(&quot;Saving user...&quot;);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以创建一个基于JDK Proxy的简单切面：</p><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java"><pre><code><span class="line">import java.lang.reflect.InvocationHandler;</span>
<span class="line">import java.lang.reflect.Method;</span>
<span class="line">import java.lang.reflect.Proxy;</span>
<span class="line"></span>
<span class="line">public class JdkProxyExample {</span>
<span class="line"></span>
<span class="line">    public static void main(String[] args) {</span>
<span class="line">        // 创建目标对象</span>
<span class="line">        final UserService userService = new UserServiceImpl();</span>
<span class="line"></span>
<span class="line">        // 通过JDK Proxy创建代理对象</span>
<span class="line">        UserService proxy = (UserService) Proxy.newProxyInstance(</span>
<span class="line">            UserService.class.getClassLoader(),</span>
<span class="line">            new Class[]{UserService.class},</span>
<span class="line">            new InvocationHandler() {</span>
<span class="line">                @Override</span>
<span class="line">                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {</span>
<span class="line">                    System.out.println(&quot;Before method execution&quot;);</span>
<span class="line">                    Object result = method.invoke(userService, args);</span>
<span class="line">                    System.out.println(&quot;After method execution&quot;);</span>
<span class="line">                    return result;</span>
<span class="line">                }</span>
<span class="line">            });</span>
<span class="line">        // 使用代理对象调用方法</span>
<span class="line">        proxy.saveUser();</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cglib" tabindex="-1"><a class="header-anchor" href="#cglib"><span>CGLIB</span></a></h2><p>CGLIB是一个强大的高性能代码生成库，它可以在运行期扩展Java类与实现Java接口（使用ASM技术，效率是不如JDK Proxy的）。CGLIB适用于没有实现任何接口的目标类（当然如果实现了接口也是可以的，因为本质上是生成目标类的子类，所以必须可继承就可以）。 <strong>例子：</strong> 我们继续使用上面的<code>UserServiceImpl</code>，但这次不实现接口。</p><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java"><pre><code><span class="line">public class UserServiceImpl {</span>
<span class="line">    public void saveUser() {</span>
<span class="line">        System.out.println(&quot;Saving user...&quot;);</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，使用CGLIB创建代理：</p><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java"><pre><code><span class="line">import net.sf.cglib.proxy.Enhancer;</span>
<span class="line">import net.sf.cglib.proxy.MethodInterceptor;</span>
<span class="line">import net.sf.cglib.proxy.MethodProxy;</span>
<span class="line"></span>
<span class="line">import java.lang.reflect.Method;</span>
<span class="line"></span>
<span class="line">public class CglibProxyExample {</span>
<span class="line"></span>
<span class="line">    public static void main(String[] args) {</span>
<span class="line">        Enhancer enhancer = new Enhancer();</span>
<span class="line">        enhancer.setSuperclass(UserServiceImpl.class);</span>
<span class="line">        enhancer.setCallback(new MethodInterceptor() {</span>
<span class="line">            @Override</span>
<span class="line">            public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {</span>
<span class="line">                System.out.println(&quot;Before method execution&quot;);</span>
<span class="line">                Object result = proxy.invokeSuper(obj, args);</span>
<span class="line">                System.out.println(&quot;After method execution&quot;);</span>
<span class="line">                return result;</span>
<span class="line">            }</span>
<span class="line">        });</span>
<span class="line">        UserServiceImpl userService = (UserServiceImpl) enhancer.create();</span>
<span class="line">        userService.saveUser();</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="spring-aop" tabindex="-1"><a class="header-anchor" href="#spring-aop"><span>Spring AOP</span></a></h3><p>Spring AOP可以自动选择使用JDK Proxy还是CGLIB来创建代理。如果目标对象实现了至少一个接口，则默认使用JDK Proxy；否则使用CGLIB。 Spring AOP利用了AspectJ的规范，然后具体实现动态代理还是依赖JDK Proxy和CGLIB技术。 <strong>例子：</strong> 首先配置Spring上下文并定义切面：</p><div class="language-XML line-numbers-mode" data-highlighter="prismjs" data-ext="XML"><pre><code><span class="line">&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span>
<span class="line">       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span>
<span class="line">       xmlns:aop=&quot;http://www.springframework.org/schema/aop&quot;</span>
<span class="line">       xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans</span>
<span class="line">           http://www.springframework.org/schema/beans/spring-beans.xsd</span>
<span class="line">           http://www.springframework.org/schema/aop</span>
<span class="line">           http://www.springframework.org/schema/aop/spring-aop.xsd&quot;&gt;</span>
<span class="line"></span>
<span class="line">    &lt;bean id=&quot;userService&quot; class=&quot;com.example.UserService&quot;/&gt;</span>
<span class="line"></span>
<span class="line">    &lt;aop:config&gt;</span>
<span class="line">        &lt;aop:aspect ref=&quot;loggingAspect&quot;&gt;</span>
<span class="line">            &lt;aop:before method=&quot;logBefore&quot; pointcut=&quot;execution(* com.example..*(..))&quot;/&gt;</span>
<span class="line">        &lt;/aop:aspect&gt;</span>
<span class="line">    &lt;/aop:config&gt;</span>
<span class="line"></span>
<span class="line">    &lt;bean id=&quot;loggingAspect&quot; class=&quot;com.example.LoggingAspect&quot;/&gt;</span>
<span class="line">&lt;/beans&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义切面类：</p><div class="language-Java line-numbers-mode" data-highlighter="prismjs" data-ext="Java"><pre><code><span class="line">package com.example;</span>
<span class="line"></span>
<span class="line">import org.aspectj.lang.annotation.Aspect;</span>
<span class="line">import org.aspectj.lang.annotation.Before;</span>
<span class="line"></span>
<span class="line">@Aspect</span>
<span class="line">public class LoggingAspect {</span>
<span class="line">    @Before(&quot;execution(* com.example..*(..))&quot;)</span>
<span class="line">    public void logBefore() {</span>
<span class="line">        System.out.println(&quot;Before method execution&quot;);</span>
<span class="line">    }</span>
<span class="line">    @Before(&quot;execution(* com.example.service.*.*(..))&quot;)</span>
<span class="line">    public void logBefore2(JoinPoint joinPoint) {</span>
<span class="line">        // 获取方法签名</span>
<span class="line">        String methodName = joinPoint.getSignature().getName();</span>
<span class="line">        // 获取目标类名称</span>
<span class="line">        String className = joinPoint.getTarget().getClass().getSimpleName();</span>
<span class="line">        // 获取传入参数</span>
<span class="line">        Object[] args = joinPoint.getArgs();</span>
<span class="line"></span>
<span class="line">        System.out.println(&quot;Executing: &quot; + className + &quot;.&quot; + methodName + &quot;()&quot;);</span>
<span class="line">        if (args.length &gt; 0) {</span>
<span class="line">            System.out.println(&quot;Arguments: &quot;);</span>
<span class="line">            for (Object arg : args) {</span>
<span class="line">                System.out.println(&quot;\\t&quot; + arg);</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就配置了一个简单的Spring AOP切面，在<code>com.example</code>包下的所有方法执行前打印一条消息。 以上就是JDK Proxy、CGLIB以及Spring AOP的基本示例。在实际项目中，通常推荐直接使用Spring AOP，因为它提供了更高级别的抽象和便利性。</p>`,17)]))}const d=n(l,[["render",r]]),t=JSON.parse('{"path":"/posts/obsidian/%E8%AF%AD%E8%A8%80/Java/%E5%8A%A8%E6%80%81%E4%BB%A3%E7%90%86.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"JDK Proxy","slug":"jdk-proxy","link":"#jdk-proxy","children":[]},{"level":2,"title":"CGLIB","slug":"cglib","link":"#cglib","children":[{"level":3,"title":"Spring AOP","slug":"spring-aop","link":"#spring-aop","children":[]}]}],"git":{"updatedTime":1748842810000,"contributors":[{"name":"sujie","username":"sujie","email":"13156660820@163.com","commits":1,"url":"https://github.com/sujie"}],"changelog":[{"hash":"906fd9063805f50a4e5ae54af0e65b6022d19921","time":1748842810000,"email":"13156660820@163.com","author":"sujie","message":"publish:cpOb2Posts, 2025-06-02 13:40:10"}]},"filePathRelative":"posts/obsidian/语言/Java/动态代理.md","excerpt":"<p>Spring AOP（面向切面编程）允许开发者定义横切关注点，如日志记录、事务管理等，并将这些逻辑应用于业务代码中而无需修改原有的业务逻辑。Spring AOP可以使用JDK动态代理和CGLIB来实现AOP的功能。</p>\\n<h2>JDK Proxy</h2>\\n<p>JDK Proxy是Java自带的代理机制，它要求被代理的类必须实现一个或多个接口。JDK Proxy通过在运行时创建实现相同接口的<strong>新类</strong>来生成代理对象。\\n<strong>例子：</strong>\\n假设我们有一个简单的<code>UserService</code>接口及其实现：</p>\\n<div class=\\"language-Java line-numbers-mode\\" data-highlighter=\\"prismjs\\" data-ext=\\"Java\\"><pre><code><span class=\\"line\\">public interface UserService {</span>\\n<span class=\\"line\\">    void saveUser();</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\">public class UserServiceImpl implements UserService {</span>\\n<span class=\\"line\\">    @Override</span>\\n<span class=\\"line\\">    public void saveUser() {</span>\\n<span class=\\"line\\">        System.out.println(\\"Saving user...\\");</span>\\n<span class=\\"line\\">    }</span>\\n<span class=\\"line\\">}</span>\\n<span class=\\"line\\"></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>"}');export{d as comp,t as data};
