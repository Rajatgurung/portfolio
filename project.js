import projects from "./portfolio.json";
const projectWrapper = (project, i) => ` <div class=" flex flex-col ${
  i % 2 && "md:flex-row-reverse"
}  md:flex-row gap-y-10  gap-x-10">
<div class=" md:w-1/2 h-64 overflow-hidden border-4 border-red-200 " style=" border-image: 
linear-gradient(
  38deg, 
  #DC2626, 
  rgba(0, 0, 0, 0),
  rgba(0, 0, 0, 0),
  #DC2626
) 1 ">
  <img class="  object-cover" src="${project.image}" alt="">
</div>
<div class=" flex-1 md:px-9">
  <h3 class="text-3xl font-bold">${project.title}</h3>
  <div class=" my-4">
  ${project.stack
    .map(
      (el) =>
        `<span class=" inline-block my-1 text-sm py-1 px-3 bg-red-600 rounded-xl mr-1">${el}</span>`
    )
    .join("")}
   
  </div>
  <p class=" text-gray-400 text-lg">${project.discription}</p>
</div>
</div>`;
const initProject = () => {
  const container = document.getElementById("projectContainer");
  projects.map((el, i) => (container.innerHTML += projectWrapper(el, i)));
};
export default initProject;
