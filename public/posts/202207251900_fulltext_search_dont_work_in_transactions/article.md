---
title: MySQLのFullTextSearchはトランザクション内のデータを対象としない
published: 2022-07-25 18:00:00
updated: 2022-07-25 18:00:00
tags: MySQL,Laravel
---

# MySQL の FullTextSearch はトランザクション内のデータを対象としない

## 問題

Laravel の FeatureTest で検索機能に対するテストが意図しない結果を出した。雑に例を作ると大体こんな感じ。

```php
<?php
class UserIndexTest extends TestCase
{
    use RefreshDatabase;
    public function testIndexUserAll() {
    User::factory()->create(['name' => 'foobar']);
    $response = $this->get('/users');
    $data = $response->json();
    $this->assertCount(1, $data); // → 成功: 1件
  }

  public function testIndexUserSearchByName() {
    User::factory()->create(['name' => 'foobar']);
    // MySQLのFullTextSearchで実装された検索を使う形で一覧APIを呼び出したとする
    $response = $this->get('/users?name=foo');
    $data = $response->json();
    $this->assertCount(1, $data); // → 失敗: 0件
  }
}
```

## 原因

FullTextIndex はトランザクション内で追加されたデータに対して効かない。そして RefreshDatabase はトランザクションを切って実行される。ゆえに RefreshDatabase が有効な状態で FullTextSearch を含むクエリを使うと直前に作ったテストデータが対象にならなかっただけ。

[https://dev.mysql.com/doc/refman/8.0/en/innodb-fulltext-index.html#innodb-fulltext-index-transaction](https://dev.mysql.com/doc/refman/8.0/en/innodb-fulltext-index.html#innodb-fulltext-index-transaction)

## 解決

実行前にコミットすれば動く。

```php
<?php
class UserIndexTest extends TestCase
{
    use RefreshDatabase;
    public function testIndexUserAll() {
    User::factory()->create(['name' => 'foobar']);
    $response = $this->get('/users');
    $data = $response->json();
    $this->assertCount(1, $data); // → 成功: 1件
  }

  public function testIndexUserSearchByName() {
    User::factory()->create(['name' => 'foobar']);
    // 実行前にコミットする
    DB::commit();
    // MySQLのFullTextSearchで実装された検索を使う形で一覧APIを呼び出したとする
    $response = $this->get('/users?name=foo');
    $data = $response->json();
    $this->assertCount(1, $data); // → 成功: 1件
  }
}
```

## 余談

かなり簡単な引っ掛かり方をしたけど、ぱっと検索に引っかかる日本語の記事が無かったので一応記録。MySQL 以外でもこういう挙動するのかは試してない。
