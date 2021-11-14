import server from './server.js';
import assertFolders from './assert_folders.js';

await assertFolders();
await server();