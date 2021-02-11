// const dummy = (blogs) => {
//     return 1
//   }

const totalLikes = (blogs) => {
    let sum =0

    blogs.forEach(blog => {
        sum += blog.likes
    });

    return sum
}

const favoriteBlog = (blogs) => {

    if(blogs.length === 0) {
        return "none"
    }else {
        let favoriteBlog = blogs[0]
        let mostLikes = blogs[0].likes

        blogs.forEach(blog => {
            if(blog.likes > mostLikes){
                favoriteBlog = blog
                mostLikes = blog.likes
            }
        });
        return favoriteBlog
    }
}
  
  module.exports = {
    totalLikes,
    favoriteBlog
  }

 