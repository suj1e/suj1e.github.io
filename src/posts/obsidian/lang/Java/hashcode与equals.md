---
icon: pen-to-square
date: 2025-06-02
category:
  - 语言
tags:
  - java
---
# hashcode与equals

## equals方法 

`Object#equals`

```Java
public boolean equals(Object obj) {
    return (this == obj);
}
```
equals是顶层方法，可以看出默认和`==`一致，也就是比较内存地址是否相等。
## equals作用

### 没有重写equals的情况

没有重写equals，效果其实等同于==
```Java
public class Sample1 {
    public static void main(String[] args) {
        Person p1 = new Person(20, "lisi");
        Person p2 = new Person(20, "lisi");
        System.out.println(p1.equals(p2));
    }
    
    private static class Person {
        int age;
        String name;
        
        public Person(int age, String name) {
            this.age = age;
            this.name = name;
        }
    }
}
```
输出为false
没有重写equals，则比较的是对象的内存地址

### 重写了equals的情况

```Java
public class Sample2 {
    public static void main(String[] args) {
        Person p1 = new Person(20, "lisi");
        Person p2 = new Person(20, "lisi");
        System.out.println(p1.equals(p2));
    }
    
    private static class Person {
        int age;
        String name;
        
        public Person(int age, String name) {
            this.age = age;
            this.name = name;
        }
        
        @Override
        public boolean equals(Object o) {
            if(o == null) {
                return false;
            }
            if(this == o) {
                return true;
            }
            if(this.getClass() != o.getClass()) {
                return false;
            }
            Person p = (Person)o;
            return name.equals(p.name) && age == p.age;
        }
    }
}
```
输出true
重写equals有几个必须要遵守的点：
1. 对称性，x.equals(y)为true，则y.equals(x)也必须为true
2. 反射性，x.equals(x)必须为true
3. 类推性，x.equals(y)为true，y.equals(z)为true，那么z.equals(x)也必须为true
4. 一致性，x.equals(y)为true，只要x和y内容不变，无论重复多少次x.equals(y)，那么都必须为true；x.equals(不同类型)必须返回false
5. 非空性，x.equals(null)都必须返回false

## equals与`==`的区别

1. `==`：它的作用是判断两个对象的内存地址是否对象
2. equals：它的作用是判断两个对象是否相等，有两种情况
    1. 没有重写equals方法，等价于`==`
    2. 重写了equals方法，比较两个对象的内容是否相等，若内容相等，则equals返回true
## hashCode方法

分两种情况
### 不会创建“类对应的散列表”

不会在HashSet、HashMap、Hashtable等这些哈希表数据结构容器中用到该类，则该类符合【不会创建“类对应的散列表”】类型
1. 此时hashCode方法和equals方法是无关的
2. 这种情况，equals用于表示两个对象是否相等，与hashCode无关
```Java
public class Sample3 {

    public static void main(String[] args) {
        Person p1 = new Person(20, "lisi");
        Person p2 = new Person(20, "lisi");
        Person p3 = new Person(30, "lisi");
        System.out.printf("p1.equals(p2) : %s; p1(%d) p2(%d)\n", p1.equals(p2), p1.hashCode(), p2.hashCode());
        System.out.printf("p1.equals(p3) : %s; p1(%d) p3(%d)\n", p1.equals(p3), p1.hashCode(), p3.hashCode());
    }
    
    private static class Person {
        int age;
        String name;
        
        public Person(int age, String name) {
            this.age = age;
            this.name = name;
        }
        
        @Override
        public boolean equals(Object o) {
            if(o == null) {
                return false;
            }
            if(this == o) {
                return true;
            }
            if(this.getClass() != o.getClass()) {
                return false;
            }
            Person p = (Person)o;
            return name.equals(p.name) && age == p.age;
        }
    }
}
```
这种情况就是没在哈希结构的容器中使用到，所以跟hashCode没啥关系

### 会创建“类对应的散列表”

此种情况可以理解为会在哈希结构的容器中使用到，所以必然与hashCode有关，比如用到了HashSet
在这种情况下，hashCode与equals是有一定关系的
1. 如果两个对象相等（equals为true），那么它们hashCode一定相等
2. 如果两个对象hashCode相等，它们不一定相等，此种情况也叫哈希冲突
```Java
public class Sample4 {

    public static void main(String[] args) {
        Person p1 = new Person(20, "lisi");
        Person p2 = new Person(20, "lisi");
        Person p3 = new Person(30, "lisi");
        System.out.printf("p1.equals(p2) : %s; p1(%d) p2(%d)\n", p1.equals(p2), p1.hashCode(), p2.hashCode());
        System.out.printf("p1.equals(p3) : %s; p1(%d) p3(%d)\n", p1.equals(p3), p1.hashCode(), p3.hashCode());
    }
    
    private static class Person {
        int age;
        String name;
        
        public Person(int age, String name) {
            this.age = age;
            this.name = name;
        }
        
        @Override
        public int hashCode() {
            int i = name.hashCode();
            return i % age;
        }
        
        @Override
        public boolean equals(Object o) {
            if(o == null) {
                return false;
            }
            if(this == o) {
                return true;
            }
            if(this.getClass() != o.getClass()) {
                return false;
            }
            Person p = (Person)o;
            return name.equals(p.name) && age == p.age;
        }
    }
}
```

也就是说之所以重写equals要重写hashCode，就是因为必须保证以哈希表为数据结构的容器（比如HashSet）添加元素时的正确性。