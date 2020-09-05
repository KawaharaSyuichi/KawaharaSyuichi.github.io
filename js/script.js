$(function () {
    // #tab1以外を非表示にする
    $('#contents div[id != "github"]').hide();

    // タブをクリック
    $("a").click(function () {
        // 一度全てのコンテンツを非表示にする
        $("#contents div").hide();

        // 選択されたコンテンツを再表示する
        $($(this).attr("href")).show();

        // 現在のcurrentクラスを削除
        $(".current").removeClass("current");

        // 選択されたタブ（自分自身）にcurrentクラスを追加
        $(this).addClass("current");

        return false;
    });
});
