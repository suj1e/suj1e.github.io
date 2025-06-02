注入bean的几种方式：
- @Component及派生注解
- @EnableXx搭配@Import注册
- @Import
- @Bean
- registry
- FactoryBean
- ImportSelector
- ImportBeanDefinitionRegistrar

使用FactoryBean，可以**隐藏bean的细节**，同时可以引入更复杂的处理
1. 可以实现一个特别复杂的对象
2. 或者可以通过创建代理对象【@EnableFeignClients是一个很好的例子】  

factoryBean的使用场景：
1. 类似于接口代理【FeignClient】
2. 类似于mapper代理执行【mybatis mapper定义】
3. 总结：一般都用于对于interface的方法执行代理

**注解的本质就是打标签、然后解析注解根据标签来做事。**