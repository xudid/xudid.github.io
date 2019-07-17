$(document).ready(function(){
    let page  = urlParam('page');
    let item = urlParam('item');
    
    switch(page){
        case 'documentation':
                loadNavBar("navdoc.html");
                setContainerOrientation("column");
                loadContent(page);
            break;

        case 'documentation_item':
                loadNavBar("navdoc.html");
                setContainerOrientation("column");
                loadDocumentationView();
                setDocumentationViewTitle(item);
                loadDocumentationPackageClassList(item);
                loadPackageDocumentation(item);
            break;

        case 'examples':
            loadNavBar("navexamples.html");
            setContainerOrientation("column");
            loadContent(page);
            break;

        default:
            
            loadNavBar("navhome.html");
            page = "home";
            setContainerOrientation("row");
            loadContent(page);
            break;

    }
    });

function loadNavBar(page){
    $.ajax({
                url:"nav/"+page,
                type: 'GET',
                dataType: 'html',
                success: function(code_html, statut){
                    $(code_html).appendTo("#header");
                },

                error: function(){
                    alert("fail to load nav menu");
                }
            });
}

function loadContent(page,item){
    
    let baseUrl = "/"+page;
    if (item != null)
    {
        baseUrl = baseUrl+".html"+"?item="+item
    }
    else
    {
        baseUrl = baseUrl+"/"+page+".html"
    }
    
    $.ajax({

                url:baseUrl,
                type: 'GET',
                dataType: 'html',
                success: function(code_html, statut){
                    $(code_html).appendTo("#container");
                },

                error: function(){
                    alert("fail to load content");
                }
            });
}

function loadDocumentationView()
{
    let baseUrl = "documentation/documentation_item.html";
    $.ajax({
        url:baseUrl,
        type:'GET',
        dataType:'html',
        async: false,
        success:function(code_html,statut){
            $("#container").append(code_html);
        },

        error:function(){

        }
    });
    
}

function setDocumentationViewTitle(item)
{
    $("#item_title").text("Documentation for : "+item);
}

function urlParam(name){
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

function setContainerOrientation(orientation)
{
    if (orientation === "column"){
        $("#container").attr("class" , "doc");
    }

    if (orientation === "row"){
        $("#container").attr("class" , "main");
    }

    else{
        $("#container").attr("class" , "doc");
    }
}

function loadDocumentationPackageClassList(package)
{
        let baseUrl = "documentation/"+package+"/classlist.html";
    $.ajax({
        url:baseUrl,
        type:'GET',
        dataType:'html',
       
        success:function(code_html,statut){
            $("#class_list").attr('class',package);
            $("#class_list").append(code_html);
        },

        error:function(){

        }
    });
}

function loadPackageDocumentation(package)
{
    let baseUrl = "documentation/"+package+"/"+package+".html";
    $.ajax({
        url:baseUrl,
        type:'GET',
        dataType:'html',
       
        success:function(code_html,statut){
            $("#package_doc").append(code_html);
        },

        error:function(){

        }
    });
}