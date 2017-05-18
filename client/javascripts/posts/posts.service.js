(function() {
  'use strict'

  angular.module('app')
    .service('postService', service),

    service.$inject = ['$http']

    function service($http) {
      const sm = this

      sm.getPosts = getPosts
      sm.addPost = addPost
      sm.deletePost = deletePost
      sm.editForm = editForm
      sm.editPost = editPost

      function getPosts() {
         return $http.get('/classifieds').then(posts => {
            return posts.data
         })
      }

      function addPost(post) {
         console.log('addPost', post);
         return $http.post('/classifieds', post).then(res => {
            console.log('res', res);
            return res.data
         })
      }

      function editForm(id) {
         return $http.get(`/classifieds/${id}`).then(posts => {
            return posts.data
         })
      }

      function editPost(post, postId) {
         console.log(post, postId);
         return $http.patch(`/classifieds/${postId}`, post).then(post => {
            console.log('data', post.data);
            return post.data
         })
      }

      function deletePost(id) {
         return $http.delete(`/classifieds/${id}`).then(post => {
            return post.data
         })
      }

    }

}())
