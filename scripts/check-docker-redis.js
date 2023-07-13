import Docker from 'dockerode';
import dotenv from 'dotenv';

dotenv.config();

// NOTE: docker automatically adds a suffix to service container_name.
// i.e. COMPOSE_PROJECT_NAME + service name + increment
const containerName = process.env.COMPOSE_PROJECT_NAME + '-redis-1';

const docker = new Docker();

docker.listContainers({ all: true }, (err, containers) => {
  const redisContainer = containers.find(({ Names }) => Names.includes('/' + containerName));

  if (redisContainer) {
    if (redisContainer.State === 'running') success(redisContainer);
    else tryRun(redisContainer);
  } else {
    console.error(`\x1b[31mRedis container "${containerName}" is not found!\x1b[0m`);
    process.exit(1);
    // We can programmatically compose here with the yaml file and library dockerode-compose.
    // var DockerodeCompose = require('dockerrode-compose');
    // var yamlFile = 'docker-compose.yml';
    // var projectName = process.env.COMPOSE_PROJECT_NAME;
    // var compose = new DockerodeCompose(docker, yamlFile, projectName);

    // (async () => {
    //   var state = await compose.up();
    //   console.log(state);
    // })();
  }
});

function tryRun(container) {
  console.log('\x1b[34m%s\x1b[0m', `※ ${containerName} state is "${container.State}". Attempting to rerun service...`);
  docker.getContainer(container.Id).start(err => {
    if (!err) success(container);
    else {
      console.error(`\x1b[31mCannot run docker container "${container.Id}"!\x1b[0m\n`, err);
      process.exit(1);
    }
  });
}

function success(container) {
  const { Id, Names, Image, Ports, State, Status } = container;
  const Port = (Ports || [])[0];
  console.log('\x1b[32m%s\x1b[0m', `✅ ${containerName} is up and running!`);
  console.info({ Id, Names, Image, Port, State, Status });
  // Added delay
  setTimeout(() => {
    process.exit(0);
  }, 1500);
}
