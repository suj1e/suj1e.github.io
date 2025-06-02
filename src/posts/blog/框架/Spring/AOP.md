ProxyProcessorSupport
四种常用实现方式
1. 定义`DefaultAnnotationPointAdvisor`bean，配置切点和拦截器（实现`MethodInterceptor`）
2. 使用ProxyFactory创建一个proxy
3. `@Aspect`定制切面，配置execution和通知
4. FactoryBean自定义bean的生成【可以在创建bean的时候赋予它proxy能力】