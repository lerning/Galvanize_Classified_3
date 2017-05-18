(function(){
   'use strict'
   angular.module('app')
      .component('posts', {
         controller: controller,
         templateUrl: "views/posts.html"
      })

      controller.$inject = ['postService']
      function controller(postService) {
         const vm = this

         vm.$onInit = onInit
         vm.posts = []
         vm.doGet = doGet
         vm.toggleCreate = toggleCreate
         vm.createPost = createPost
         vm.deletePost = deletePost
         vm.updatePost = updatePost
         vm.editPost = editPost

         function onInit() {
            doGet()
         }

         function toggleCreate() {
            vm.showPost ? vm.showPost = !vm.showPost :  vm.showPost = true
         }

         function createPost() {
            postService.addPost(vm.post).then(res => {

               vm.posts.push(res)
            })
            delete vm.post
            vm.showPost = false
         }


         function updatePost(postId) {
            vm.updateId = postId
            vm.showEdit ? vm.showEdit = !vm.showEdit :  vm.showEdit = true
            postService.editForm(postId).then(res => {
               vm.post = res
            })
         }

         function editPost(post, postId) {
            postService.editPost(post, postId).then(res => {
               doGet()
               delete vm.post
               vm.showEdit = false
            })
         }

         function deletePost(id) {
            postService.deletePost(id).then(res => {
               console.log('id', id);
               vm.posts.splice(id, 1)
            })
            doGet()
         }

         function doGet() {
            postService.getPosts().then(posts => {
               vm.posts = posts
               console.log(vm.posts);

            })
         }

      }

}())
